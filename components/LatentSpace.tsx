'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Random function for cinematic grain
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Normalize coordinates and adjust for aspect ratio
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    st.x *= aspect.x;

    // Slower, elegant pacing
    float t = u_time * 0.06;

    // Map mouse coordinates from (-1 to 1) to (0 to 1) and correct for aspect ratio
    vec2 mouse = (u_mouse * 0.5 + 0.5);
    mouse.x *= aspect.x;

    vec2 p = st * 1.2; // Scale for sweeping folds
    
    // Mouse Refraction - Gently displaces the liquid where the cursor hovers
    vec2 dir = st - mouse;
    float dist = length(dir);
    p += normalize(dir) * exp(-dist * 3.0) * 0.05;

    // Layered noise with Domain Warping for molten/silk feel
    float n1 = snoise(p + t);
    float n2 = snoise(p * 2.0 - t * 0.6 + n1 * 0.5);
    float n3 = snoise(p * 4.0 + t * 0.3 + n2 * 0.25);

    // Combine into a smooth, swirling flow
    float flow = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    
    // Create soft velvet folds using sine wave manipulation
    float folds = sin(flow * 6.0 + t * 1.5);
    float silk = smoothstep(-1.0, 1.0, folds);
    
    // Extract sharp peaks for specular-like glowing reflections
    float highlight = smoothstep(0.5, 1.0, silk);

    // Modern Luxury Palette: Obsidian, Metallic Graphite, and Champagne Gold
    vec3 colorBase = vec3(0.04, 0.04, 0.05);   // Matte obsidian
    vec3 colorMid = vec3(0.12, 0.12, 0.14);    // Metallic graphite
    vec3 colorAccent = vec3(0.85, 0.72, 0.55); // Champagne gold
    
    // Base surface interpolation
    vec3 finalColor = mix(colorBase, colorMid, silk);
    
    // Add glowing champagne highlights at the peaks
    finalColor = mix(finalColor, colorAccent, highlight * 0.35);

    // Add a soft, ambient spotlight directly from the cursor
    float spotlight = exp(-dist * 2.5);
    finalColor += colorAccent * spotlight * 0.06;
    
    // Elegant Vignette (darkens edges smoothly)
    float vignette = length(st - aspect * 0.5);
    finalColor *= smoothstep(1.5, 0.3, vignette);
    
    // Dithering/Film Grain (Crucial for premium feel & preventing color banding)
    finalColor += (random(st) - 0.5) * 0.03;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`;

const ShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }), [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;

      // Smoothly interpolate mouse position (pointer is automatically -1 to 1)
      material.uniforms.u_mouse.value.lerp(
        new THREE.Vector2(pointer.x, pointer.y),
        0.05
      );

      material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export default function LatentSpace() {
  return (
    // 'bg-black' provides a fallback, completely overriding any underlying light theme
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#0a0a0c]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]} // Crisp rendering
        gl={{ antialias: false, powerPreference: "high-performance" }} // Optimized
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}