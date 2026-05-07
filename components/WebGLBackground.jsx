"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;
  varying float vElevation;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x00 = x0;
    vec3 i10 = i1;
    vec3 i20 = i2;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Grid-like stepped noise
    float noise = snoise(vec3(pos.x * 2.5, pos.y * 2.5, uTime * 0.1));
    float steppedNoise = floor(noise * 12.0) / 12.0;
    
    // Mouse interaction - warping the terrain locally
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    float mouseInfluence = smoothstep(0.8, 0.0, dist);
    
    // Digital Glitch Spikes
    float glitchTrigger = step(0.99, sin(uTime * 2.0 + pos.x * 10.0));
    float glitch = snoise(vec3(pos.x * 50.0, pos.y * 50.0, uTime)) * glitchTrigger * 0.1;

    float elevation = steppedNoise * 0.25 + mouseInfluence * 0.3 + glitch;
    
    // Fly-through
    pos.y += uScroll * 6.0;
    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 darkColor = vec3(0.031, 0.031, 0.055); 
    vec3 accentColor = vec3(1.0, 0.24, 0.0); 

    // Mix color based on elevation and mouse proximity
    float dist = distance(vUv, uMouse * 0.5 + 0.5);
    float glow = smoothstep(0.4, 0.0, dist) * 0.4;
    
    float intensity = smoothstep(-0.05, 0.3, vElevation);
    vec3 color = mix(darkColor, accentColor, intensity * 0.4 + glow);

    // Sharp digital grid
    float lineX = smoothstep(0.985, 1.0, fract(vUv.x * 50.0));
    float lineY = smoothstep(0.985, 1.0, fract(vUv.y * 50.0));
    float grid = max(lineX, lineY);
    
    // Radar Pulse
    float pulse = sin(uTime * 1.5 - distance(vUv, vec2(0.5)) * 12.0);
    pulse = smoothstep(0.9, 1.0, pulse);
    
    color += accentColor * grid * (0.2 + glow);
    color += accentColor * pulse * 0.08;

    // Vignette
    float vDist = distance(vUv, vec2(0.5));
    float vignette = 1.0 - smoothstep(0.3, 1.1, vDist);
    color *= mix(0.3, 1.2, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef();
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const lastScrollY = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
  }), []);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      uniforms.uTime.value = clock.getElapsedTime();
      
      // Smooth mouse follow
      mouseRef.current.lerp(mouse, 0.05);
      uniforms.uMouse.value.copy(mouseRef.current);

      // Track scroll progress (0 to 1) for the fly-through effect
      const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
      const maxScroll = typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 1000;
      const scrollProgress = currentScroll / maxScroll;
      
      // Smoothly update the scroll uniform
      uniforms.uScroll.value += (scrollProgress - uniforms.uScroll.value) * 0.05;
      
      // Rotate mesh slightly based on mouse
      meshRef.current.rotation.y = mouseRef.current.x * 0.1;
      meshRef.current.rotation.x = -Math.PI / 3 + mouseRef.current.y * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[10, 10, 80, 80]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ opacity: 0.9 }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
