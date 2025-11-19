import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function Hardscape() {
    // Complex intertwined driftwood structure
    const driftwoodPieces = useMemo(() => {
        const pieces = []

        // Main twisted structure - left to right
        const mainPath = [
            [-5, 0], [-4, 0.8], [-3, 1.5], [-2, 2], [-1, 2.3],
            [0, 2.5], [1, 2.4], [2, 2], [3, 1.5], [4, 0.8], [5, 0]
        ]

        for (let i = 0; i < mainPath.length - 1; i++) {
            const [x1, y1] = mainPath[i]
            const [x2, y2] = mainPath[i + 1]
            const z = (Math.random() - 0.5) * 2

            pieces.push({
                start: [x1, y1, z],
                end: [x2, y2, z + (Math.random() - 0.5)],
                radius: 0.12 - (i * 0.005)
            })
        }

        // Additional twisted branches
        for (let branch = 0; branch < 8; branch++) {
            const startX = (Math.random() - 0.5) * 8
            const startZ = (Math.random() - 0.5) * 4
            let x = startX, y = 0, z = startZ

            for (let seg = 0; seg < 4; seg++) {
                const nextX = x + (Math.random() - 0.5) * 2
                const nextY = y + 0.5 + Math.random() * 0.8
                const nextZ = z + (Math.random() - 0.5) * 2

                pieces.push({
                    start: [x, y, z],
                    end: [nextX, nextY, nextZ],
                    radius: 0.1 - (seg * 0.015)
                })

                x = nextX
                y = nextY
                z = nextZ
            }
        }

        return pieces
    }, [])

    // Ultra-dense moss covering everything
    const mossClumps = useMemo(() => {
        const clumps = []

        // Moss covering driftwood densely
        for (let i = 0; i < 200; i++) {
            const x = (Math.random() - 0.5) * 10
            const y = Math.random() * 3
            const z = (Math.random() - 0.5) * 4
            const scale = 0.08 + Math.random() * 0.15
            const hue = 0.28 + Math.random() * 0.1

            clumps.push({
                position: [x, y, z],
                scale,
                color: new THREE.Color().setHSL(hue, 0.7, 0.3 + Math.random() * 0.1)
            })
        }

        // Floor moss carpet
        for (let i = 0; i < 250; i++) {
            const x = (Math.random() - 0.5) * 12
            const y = 0.03
            const z = (Math.random() - 0.5) * 6
            const scale = 0.06 + Math.random() * 0.1
            const hue = 0.3 + Math.random() * 0.08

            clumps.push({
                position: [x, y, z],
                scale,
                color: new THREE.Color().setHSL(hue, 0.6, 0.25)
            })
        }

        return clumps
    }, [])

    // Moss-covered rocks
    const rocks = useMemo(() => [
        { position: [-4.5, 0.6, -2], scale: [2, 1.5, 2], mossCount: 15 },
        { position: [4, 0.7, -1.5], scale: [2.5, 2, 2.5], mossCount: 20 },
        { position: [-3, 0.5, 2.5], scale: [1.5, 1, 1.5], mossCount: 12 },
        { position: [2.5, 0.4, 2.8], scale: [1.2, 0.8, 1.2], mossCount: 10 },
        { position: [0, 0.3, 3], scale: [1, 0.6, 1], mossCount: 8 },
    ], [])

    return (
        <group>
            {/* Driftwood */}
            {driftwoodPieces.map((branch, i) => {
                const start = new THREE.Vector3(...branch.start)
                const end = new THREE.Vector3(...branch.end)
                const direction = end.clone().sub(start)
                const length = direction.length()
                const center = start.clone().add(direction.clone().multiplyScalar(0.5))

                const quaternion = new THREE.Quaternion()
                quaternion.setFromUnitVectors(
                    new THREE.Vector3(0, 1, 0),
                    direction.normalize()
                )

                return (
                    <mesh
                        key={`branch-${i}`}
                        position={center.toArray()}
                        quaternion={quaternion}
                        castShadow
                        receiveShadow
                    >
                        <cylinderGeometry args={[branch.radius, branch.radius * 0.85, length, 8]} />
                        <meshStandardMaterial color="#3a2418" roughness={1} />
                    </mesh>
                )
            })}

            {/* Dense moss */}
            {mossClumps.map((moss, i) => (
                <mesh
                    key={`moss-${i}`}
                    position={moss.position}
                    scale={moss.scale}
                    castShadow
                    receiveShadow
                >
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color={moss.color} roughness={1} />
                </mesh>
            ))}

            {/* Rocks with moss on top */}
            {rocks.map((rock, rockIdx) => (
                <group key={`rock-group-${rockIdx}`}>
                    <mesh
                        position={rock.position}
                        scale={rock.scale}
                        castShadow
                        receiveShadow
                    >
                        <dodecahedronGeometry args={[0.8, 0]} />
                        <meshStandardMaterial color="#4a3728" roughness={0.95} />
                    </mesh>

                    {/* Moss on rocks */}
                    {Array.from({ length: rock.mossCount }).map((_, i) => {
                        const angle = (i / rock.mossCount) * Math.PI * 2
                        const offsetX = Math.cos(angle) * rock.scale[0] * 0.4
                        const offsetZ = Math.sin(angle) * rock.scale[2] * 0.4
                        const offsetY = rock.scale[1] * 0.3 + Math.random() * rock.scale[1] * 0.3

                        return (
                            <mesh
                                key={`rock-moss-${rockIdx}-${i}`}
                                position={[
                                    rock.position[0] + offsetX,
                                    rock.position[1] + offsetY,
                                    rock.position[2] + offsetZ
                                ]}
                                scale={0.08 + Math.random() * 0.08}
                            >
                                <icosahedronGeometry args={[1, 0]} />
                                <meshStandardMaterial
                                    color={new THREE.Color().setHSL(0.29 + Math.random() * 0.08, 0.7, 0.3)}
                                    roughness={1}
                                />
                            </mesh>
                        )
                    })}
                </group>
            ))}
        </group>
    )
}
