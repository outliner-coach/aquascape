import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import useStore from '../store'
import Aquarium from './Aquarium'
import Plants from './Plants'
import Hardscape from './Hardscape'
import Fish from './Fish'

export default function Scene() {
    const brightness = useStore((state) => state.brightness)

    // Exponential sunlight intensity (0.0 ~ 1.0 → subtle to intense)
    const sunIntensity = Math.pow(brightness, 2) * 5
    const ambientIntensity = 0.15 + (brightness * brightness * 0.85)
    const skyIntensity = Math.pow(brightness, 1.5) * 0.8

    return (
        <>
            <color attach="background" args={['#050505']} />

            {/* Lighting - Sun rays effect */}
            <ambientLight intensity={ambientIntensity} />

            {/* Main sun ray - directional */}
            <directionalLight
                position={[8, 15, 5]}
                intensity={sunIntensity}
                castShadow
                shadow-bias={-0.0001}
                color="#ffffee"
            />

            {/* Secondary sun rays */}
            <directionalLight
                position={[-3, 12, 2]}
                intensity={sunIntensity * 0.3}
                color="#fff8e1"
            />

            {/* Sky light */}
            <hemisphereLight
                skyColor="#87ceeb"
                groundColor="#1a1a1a"
                intensity={skyIntensity}
            />

            {/* Water surface reflection */}
            <pointLight
                position={[0, 8, 0]}
                intensity={sunIntensity * 0.4}
                color="#b3e5fc"
                distance={15}
            />

            {/* Environment */}
            <Environment preset="city" background={false} />
            <fog attach="fog" args={['#051525', 10, 35]} />

            {/* Controls */}
            <OrbitControls
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.2}
                minDistance={4}
                maxDistance={12}
            />

            {/* Scene Content */}
            <group position={[0, -2, 0]}>
                <Aquarium />
                <Hardscape />
                <Plants />
                <Fish />
            </group>

            {/* Post Processing */}
            <EffectComposer>
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    )
}
