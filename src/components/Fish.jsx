import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Clownfish - round with stripes (rotated to face +Z)
function ClownFish({ color, stripeColor }) {
    const tailRef = useRef()

    useFrame((state) => {
        if (tailRef.current) {
            const tailWag = Math.sin(state.clock.elapsedTime * 6) * 0.4
            tailRef.current.rotation.y = tailWag
        }
    })

    return (
        <group rotation={[0, Math.PI / 2, 0]}>
            {/* Body */}
            <mesh scale={[1.2, 1, 0.6]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </mesh>

            {/* White stripes */}
            <mesh position={[0.05, 0, 0]} scale={[0.3, 1.05, 0.62]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color={stripeColor} roughness={0.3} />
            </mesh>
            <mesh position={[-0.1, 0, 0]} scale={[0.3, 1.05, 0.62]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color={stripeColor} roughness={0.3} />
            </mesh>

            {/* Tail - at -X (back) */}
            <group ref={tailRef} position={[-0.35, 0, 0]}>
                <mesh scale={[0.6, 1.2, 0.8]}>
                    <sphereGeometry args={[0.18, 8, 8]} />
                    <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
                </mesh>
            </group>

            {/* Dorsal fin */}
            <mesh position={[0, 0.28, 0]} scale={[0.6, 0.3, 0.4]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} transparent opacity={0.9} />
            </mesh>

            {/* Side fins */}
            <mesh position={[0.1, -0.05, 0.2]} rotation={[-0.5, 0, 0]} scale={[0.2, 0.1, 0.3]}>
                <sphereGeometry args={[0.1, 6, 6]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} transparent opacity={0.8} />
            </mesh>
            <mesh position={[0.1, -0.05, -0.2]} rotation={[0.5, 0, 0]} scale={[0.2, 0.1, 0.3]}>
                <sphereGeometry args={[0.1, 6, 6]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.4} transparent opacity={0.8} />
            </mesh>

            {/* Eyes - at +X (front) */}
            <mesh position={[0.2, 0.08, 0.12]}>
                <sphereGeometry args={[0.045]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.2, 0.08, -0.12]}>
                <sphereGeometry args={[0.045]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    )
}

// Pufferfish
function PufferFish({ color }) {
    const tailRef = useRef()

    useFrame((state) => {
        if (tailRef.current) {
            const tailWag = Math.sin(state.clock.elapsedTime * 6) * 0.4
            tailRef.current.rotation.y = tailWag
        }
    })

    return (
        <group rotation={[0, Math.PI / 2, 0]}>
            <mesh>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>

            {/* Spikes */}
            {Array.from({ length: 20 }).map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 20)
                const theta = Math.sqrt(20 * Math.PI) * phi
                const x = 0.25 * Math.cos(theta) * Math.sin(phi)
                const y = 0.25 * Math.sin(theta) * Math.sin(phi)
                const z = 0.25 * Math.cos(phi)

                return (
                    <mesh key={i} position={[x, y, z]} rotation={[phi, theta, 0]}>
                        <coneGeometry args={[0.02, 0.08, 4]} />
                        <meshStandardMaterial color={color} roughness={0.5} />
                    </mesh>
                )
            })}

            {/* Tail */}
            <group ref={tailRef} position={[-0.28, 0, 0]}>
                <mesh scale={[0.5, 0.9, 0.7]}>
                    <sphereGeometry args={[0.12, 6, 6]} />
                    <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
            </group>

            {/* Fins */}
            <mesh position={[0, 0, 0.2]} scale={[0.1, 0.15, 0.25]}>
                <sphereGeometry args={[0.08, 6, 6]} />
                <meshStandardMaterial color={color} roughness={0.4} transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, 0, -0.2]} scale={[0.1, 0.15, 0.25]}>
                <sphereGeometry args={[0.08, 6, 6]} />
                <meshStandardMaterial color={color} roughness={0.4} transparent opacity={0.8} />
            </mesh>

            {/* Eyes */}
            <mesh position={[0.18, 0.12, 0.1]}>
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.18, 0.12, -0.1]}>
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    )
}

// Angelfish
function AngelFish({ color }) {
    const tailRef = useRef()

    useFrame((state) => {
        if (tailRef.current) {
            const tailWag = Math.sin(state.clock.elapsedTime * 5) * 0.3
            tailRef.current.rotation.y = tailWag
        }
    })

    return (
        <group rotation={[0, Math.PI / 2, 0]}>
            <mesh scale={[0.8, 1.5, 0.4]}>
                <sphereGeometry args={[0.2, 12, 12]} />
                <meshStandardMaterial color={color} roughness={0.3} />
            </mesh>

            <mesh position={[0, 0.35, 0]} scale={[0.4, 0.6, 0.5]}>
                <coneGeometry args={[0.15, 0.4, 6]} />
                <meshStandardMaterial color={color} roughness={0.4} transparent opacity={0.9} />
            </mesh>

            <mesh position={[0, -0.35, 0]} rotation={[Math.PI, 0, 0]} scale={[0.4, 0.6, 0.5]}>
                <coneGeometry args={[0.15, 0.4, 6]} />
                <meshStandardMaterial color={color} roughness={0.4} transparent opacity={0.9} />
            </mesh>

            <group ref={tailRef} position={[-0.25, 0, 0]}>
                <mesh scale={[0.3, 1, 0.6]}>
                    <sphereGeometry args={[0.15, 6, 6]} />
                    <meshStandardMaterial color={color} roughness={0.4} transparent opacity={0.85} />
                </mesh>
            </group>

            <mesh position={[0.18, 0.08, 0.08]}>
                <sphereGeometry args={[0.035]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.18, 0.08, -0.08]}>
                <sphereGeometry args={[0.035]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    )
}

// Guppy
function Guppy({ bodyColor, tailColor }) {
    const tailRef = useRef()

    useFrame((state) => {
        if (tailRef.current) {
            const tailWag = Math.sin(state.clock.elapsedTime * 8) * 0.5
            tailRef.current.rotation.y = tailWag
        }
    })

    return (
        <group scale={0.7} rotation={[0, Math.PI / 2, 0]}>
            <mesh scale={[1, 0.8, 0.5]}>
                <sphereGeometry args={[0.15, 12, 12]} />
                <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.3} />
            </mesh>

            <group ref={tailRef} position={[-0.2, 0, 0]}>
                <mesh scale={[0.2, 1.2, 1]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color={tailColor} roughness={0.3} transparent opacity={0.9} />
                </mesh>
            </group>

            <mesh position={[0, 0.15, 0]} scale={[0.3, 0.3, 0.4]}>
                <coneGeometry args={[0.08, 0.15, 4]} />
                <meshStandardMaterial color={tailColor} roughness={0.4} transparent opacity={0.8} />
            </mesh>

            <mesh position={[0.13, 0.05, 0.06]}>
                <sphereGeometry args={[0.02]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.13, 0.05, -0.06]}>
                <sphereGeometry args={[0.02]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    )
}

function NavigatingFish({ fishIndex, fishType, color, stripeColor, tailColor, speed }) {
    const ref = useRef()

    // Create unique path for each fish
    const waypoints = useMemo(() => {
        const seed = fishIndex * 123.456
        const points = []

        // Random wandering path
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + seed
            const radius = 3 + Math.sin(seed + i) * 2
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const y = 1 + Math.sin(seed + i * 0.5) * 1.5

            points.push(new THREE.Vector3(x, y, z))
        }

        const curve = new THREE.CatmullRomCurve3(points, true)
        return { curve, startOffset: Math.random() }
    }, [fishIndex])

    useFrame((state) => {
        if (ref.current) {
            const time = (state.clock.elapsedTime * speed * 0.03 + waypoints.startOffset) % 1
            const point = waypoints.curve.getPointAt(time)
            const nextTime = (time + 0.01) % 1
            const nextPoint = waypoints.curve.getPointAt(nextTime)

            ref.current.position.copy(point)

            // Look at next point
            const direction = new THREE.Vector3().subVectors(nextPoint, point).normalize()
            const targetQuaternion = new THREE.Quaternion()
            const up = new THREE.Vector3(0, 1, 0)
            const matrix = new THREE.Matrix4().lookAt(
                new THREE.Vector3(0, 0, 0),
                direction,
                up
            )
            targetQuaternion.setFromRotationMatrix(matrix)

            ref.current.quaternion.slerp(targetQuaternion, 0.1)
        }
    })

    return (
        <group ref={ref}>
            {fishType === 'clownfish' && <ClownFish color={color} stripeColor={stripeColor} />}
            {fishType === 'puffer' && <PufferFish color={color} />}
            {fishType === 'angelfish' && <AngelFish color={color} />}
            {fishType === 'guppy' && <Guppy bodyColor={color} tailColor={tailColor} />}
        </group>
    )
}

export default function Fish() {
    const fishData = useMemo(() => [
        // Clownfish
        { type: 'clownfish', color: '#ff8c42', stripe: '#ffffff', tail: null, count: 4, speed: 1.0 },
        { type: 'clownfish', color: '#ff6b35', stripe: '#fefefe', tail: null, count: 3, speed: 0.9 },

        // Pufferfish
        { type: 'puffer', color: '#ffd93d', stripe: null, tail: null, count: 3, speed: 0.85 },
        { type: 'puffer', color: '#6bcfff', stripe: null, tail: null, count: 2, speed: 0.95 },

        // Angelfish
        { type: 'angelfish', color: '#c0c0c0', stripe: null, tail: null, count: 3, speed: 0.8 },
        { type: 'angelfish', color: '#ffa07a', stripe: null, tail: null, count: 2, speed: 0.85 },

        // Guppy
        { type: 'guppy', color: '#4a90e2', stripe: null, tail: '#ff6b9d', count: 4, speed: 1.2 },
        { type: 'guppy', color: '#f39c12', stripe: null, tail: '#e74c3c', count: 4, speed: 1.15 },
    ], [])

    let fishIndex = 0

    return (
        <group>
            {fishData.map((type, typeIdx) => (
                <group key={typeIdx}>
                    {Array.from({ length: type.count }).map((_, i) => {
                        const currentFishIndex = fishIndex++
                        return (
                            <NavigatingFish
                                key={`${typeIdx}-${i}`}
                                fishIndex={currentFishIndex}
                                fishType={type.type}
                                color={type.color}
                                stripeColor={type.stripe}
                                tailColor={type.tail}
                                speed={type.speed}
                            />
                        )
                    })}
                </group>
            ))}
        </group>
    )
}
