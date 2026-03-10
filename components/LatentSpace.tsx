'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pixelRatio;
attribute float a_random;

varying vec3 v_color;
varying float v_attention;

// 3D Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vec3 pos = position;

    // Slower, more elegant, liquid-like drifting
    float noiseFreq = 0.2;
    float noiseAmp = 0.4;
    vec3 noisePos = vec3(pos.x * noiseFreq + u_time * 0.03, pos.y * noiseFreq + u_time * 0.03, pos.z * noiseFreq);
    
    pos.x += snoise(noisePos) * noiseAmp;
    pos.y += snoise(noisePos + vec3(10.0)) * noiseAmp;
    pos.z += snoise(noisePos + vec3(20.0)) * noiseAmp;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Mouse attention logic
    vec2 ndc = gl_Position.xy / gl_Position.w;
    float distToMouse = length(ndc - u_mouse);
    float mouseAttention = smoothstep(0.7, 0.0, distToMouse);
    
    // MOBILE FIX: Auto-pulsing attention based on time and position so it glows without a mouse
    float autoPulse = (sin(u_time * 1.2 + pos.x * 1.5 + pos.y) * 0.5 + 0.5) * 0.4;
    
    v_attention = max(mouseAttention, autoPulse);

    // MOBILE FIX: Scale particle size by device pixel ratio, and make base size 3x larger
    float baseSize = 40.0 * a_random + 20.0;
    gl_PointSize = baseSize * u_pixelRatio * (1.0 / -mvPosition.z);

    // LUXURIOUS DARK PALETTE: Supports White & Blue foreground text
    vec3 colorDeepBlue = vec3(0.05, 0.25, 0.7);  // Rich, deep royal blue
    vec3 colorIceBlue = vec3(0.4, 0.8, 1.0);     // Soft cyan/ice blue
    vec3 colorWhite = vec3(0.95, 0.98, 1.0);     // Crisp silver/white

    // Smooth gradient mapping across the cluster
    float mixVal = smoothstep(-4.0, 4.0, pos.x + pos.y);
    vec3 baseColor = mix(colorDeepBlue, colorIceBlue, mixVal);
    
    // ~15% of nodes become bright silver "data stars"
    v_color = mix(baseColor, colorWhite, step(0.85, a_random));
}
`;

const fragmentShader = `
varying vec3 v_color;
varying float v_attention;

void main() {
    // Soft circular brush
    vec2 pt = gl_PointCoord - vec2(0.5);
    float d = length(pt);
    if (d > 0.5) discard;
    
    // Smoother, creamier blur on the particles
    float alpha = smoothstep(0.5, 0.1, d);

    // VISIBILITY FIX: Base opacity is now extremely high (0.6 minimum)
    float finalAlpha = alpha * (0.6 + v_attention * 0.4);
    
    // Add a slight white core glow to nodes when they pulse
    vec3 finalColor = v_color + (vec3(0.3) * v_attention);

    gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { pointer, gl } = useThree();

  // Volume Fix: Increased count significantly and spread them out to fill edges
  const [positions, randoms] = useMemo(() => {
    const count = 3000; // 3x more particles
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Widen the distribution to an ellipsoid so it covers modern 16:9 / mobile screens better
      const r = Math.pow(Math.random(), 0.5) * 9.0;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.8; // Stretch width (X)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.2; // Stretch height (Y)
      pos[i * 3 + 2] = r * Math.cos(phi); // Depth (Z)

      rnd[i] = Math.random();
    }
    return [pos, rnd];
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      // Start mouse way off-screen so the initial load doesn't have a giant bright spot
      u_mouse: { value: new THREE.Vector2(5, 5) },
      u_pixelRatio: { value: Math.min(gl.getPixelRatio(), 2) }, // Fix for mobile Retina displays
    }),
    [gl]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;

      // Smoothly track mouse if it's on screen
      material.uniforms.u_mouse.value.lerp(
        new THREE.Vector2(pointer.x, pointer.y),
        0.05
      );

      // Majestic, very slow rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-a_random" count={randoms.length} array={randoms} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function HeroBackground() {
  return (
    // Beautiful midnight gradient background. Perfectly supports white/blue text.
    <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-b from-[#030306] via-[#060814] to-[#030306] overflow-hidden">

      {/* Subtle vignette overlay to ensure text legibility in the exact center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,6,0.6)_100%)] z-10 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}