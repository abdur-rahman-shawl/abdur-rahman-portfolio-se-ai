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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // Create a slow moving time variable
    float t = u_time * 0.15;

    // Influence of mouse position
    vec2 mouse = u_mouse * 0.5;
    float dist = distance(st, mouse + vec2(0.5)); // Center mouse approx
    float mouseInfluence = smoothstep(1.0, 0.0, dist) * 0.3;

    // Layered noise for flow effect
    vec2 p = st * 2.0;
    float noise1 = snoise(p + t + mouseInfluence);
    float noise2 = snoise(p * 2.0 - t * 1.5 - mouseInfluence * 2.0);
    float noise3 = snoise(p * 4.0 + t * 2.0);
    
    // Combine noise layers
    float finalNoise = noise1 * 0.5 + noise2 * 0.25 + noise3 * 0.125;
    
    // Smooth out into bands/liquid streams
    finalNoise = sin(finalNoise * 10.0 + t);
    
    // Color mapping - Deep blues and purples to match the branding, very dark
    vec3 color1 = vec3(0.02, 0.02, 0.05); // Dark base
    vec3 color2 = vec3(0.05, 0.1, 0.2);   // Deep Blue
    vec3 color3 = vec3(0.1, 0.05, 0.15);  // Deep Purple
    
    vec3 finalColor = mix(color1, color2, smoothstep(-1.0, 0.5, finalNoise));
    finalColor = mix(finalColor, color3, smoothstep(0.0, 1.0, finalNoise));
    
    // Add extreme vignette for drama
    float vignette = length(st - vec2(0.5, 0.5));
    finalColor *= smoothstep(1.2, 0.2, vignette);
    
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
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
      // Smoothly interpolate mouse position
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
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]} // Support high-DPI displays but clip at 2x for performance
        gl={{ antialias: false, powerPreference: "high-performance" }} // Optimizations
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
