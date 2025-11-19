import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Scene from './components/Scene'
import UI from './components/UI'

function App() {
  return (
    <>
      <Leva hidden /> {/* Hide Leva panel by default, we use our own UI */}
      <UI />
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
