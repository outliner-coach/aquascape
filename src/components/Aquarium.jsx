import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../store'

// Caustics Shader for the floor
const causticsMaterial = new THREE.ShaderMaterial({
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float time;
    
    // Simplex noise function (simplified)
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
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
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
      // Caustics pattern
      float noise1 = snoise(vUv * 20.0 + time * 0.5);
      float noise2 = snoise(vUv * 15.0 - time * 0.3);
      float caustics = smoothstep(0.4, 0.8, noise1 * 0.5 + noise2 * 0.5 + 0.5);
      
      vec3 sandColor = vec3(0.9, 0.85, 0.7);
      vec3 lightColor = vec3(1.0, 1.0, 0.9);
      
      vec3 finalColor = mix(sandColor, lightColor, caustics * 0.3);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
    uniforms: {
        time: { value: 0 }
    }
})

export default function Aquarium() {
    const materialRef = useRef()

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime
        }
    })

    return (
        <group>
            {/* Sand Floor with Caustics */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 10]} /> {/* Wider floor */}
                <primitive object={causticsMaterial} ref={materialRef} attach="material" />
            </mesh>

            {/* Glass Walls (Back and Sides) */}
            <mesh position={[0, 4, -5]}>
                <planeGeometry args={[20, 8]} />
                <meshPhysicalMaterial
                    color="#aaddff"
                    transmission={0.2}
                    opacity={0.1}
                    transparent
                    roughness={0}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}
