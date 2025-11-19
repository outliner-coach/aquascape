import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Different plant types for variety
function GrassPlant({ position, height, color, swayOffset }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.elapsedTime
            const sway = Math.sin(time * 0.6 + swayOffset) * 0.2
            ref.current.rotation.z = sway
        }
    })

    return (
        <group position={position} ref={ref}>
            <mesh>
                <cylinderGeometry args={[0.015, 0.015, height, 3]} />
                <meshStandardMaterial color={color} roughness={0.8} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

function BushyPlant({ position, size, color }) {
    return (
        <group position={position}>
            {/* Multiple small spheres to create bushy look */}
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                const radius = size * 0.3
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                const y = (Math.random() - 0.3) * size * 0.5

                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[size * 0.15, 6, 6]} />
                        <meshStandardMaterial color={color} roughness={0.9} />
                    </mesh>
                )
            })}
            {/* Center sphere */}
            <mesh position={[0, size * 0.1, 0]}>
                <sphereGeometry args={[size * 0.2, 8, 8]} />
                <meshStandardMaterial color={color} roughness={0.9} />
            </mesh>
        </group>
    )
}

export default function Plants() {
    const plants = useMemo(() => {
        const temp = []

        // Dense carpet - tiny grass
        for (let i = 0; i < 800; i++) {
            const x = (Math.random() - 0.5) * 14
            const z = 2 + (Math.random() - 0.5) * 4
            const height = 0.15 + Math.random() * 0.2
            temp.push({
                type: 'grass',
                position: [x, 0, z],
                height,
                color: new THREE.Color().setHSL(0.3 + Math.random() * 0.05, 0.7, 0.4),
                swayOffset: Math.random() * Math.PI * 2
            })
        }

        // Midground mixed
        for (let i = 0; i < 300; i++) {
            const x = (Math.random() - 0.5) * 13
            const z = (Math.random() - 0.5) * 5

            if (Math.random() > 0.5) {
                // Tall grass
                const height = 1.2 + Math.random() * 1.5
                temp.push({
                    type: 'grass',
                    position: [x, 0, z],
                    height,
                    color: new THREE.Color().setHSL(0.28 + Math.random() * 0.06, 0.65, 0.38),
                    swayOffset: Math.random() * Math.PI * 2
                })
            } else {
                // Bushy
                const size = 0.4 + Math.random() * 0.5
                temp.push({
                    type: 'bush',
                    position: [x, size * 0.2, z],
                    size,
                    color: new THREE.Color().setHSL(0.31 + Math.random() * 0.05, 0.7, 0.42)
                })
            }
        }

        // Background tall plants
        for (let i = 0; i < 200; i++) {
            const x = (Math.random() - 0.5) * 18
            const z = -2.5 + (Math.random() - 0.5) * 3
            const height = 2.5 + Math.random() * 2.5
            temp.push({
                type: 'grass',
                position: [x, 0, z],
                height,
                color: new THREE.Color().setHSL(0.27 + Math.random() * 0.04, 0.6, 0.35),
                swayOffset: Math.random() * Math.PI * 2
            })
        }

        return temp
    }, [])

    return (
        <group>
            {plants.map((plant, i) => {
                if (plant.type === 'grass') {
                    return (
                        <GrassPlant
                            key={i}
                            position={plant.position}
                            height={plant.height}
                            color={plant.color}
                            swayOffset={plant.swayOffset}
                        />
                    )
                } else {
                    return (
                        <BushyPlant
                            key={i}
                            position={plant.position}
                            size={plant.size}
                            color={plant.color}
                        />
                    )
                }
            })}
        </group>
    )
}
