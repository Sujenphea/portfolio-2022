import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CameraControls from './CameraControls'
import Lights from './Lights'

function ExperienceCanvas() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: '100vh',
        width: '100vw',
      }}
    >
      <Canvas
        camera={{ zoom: 40, far: 1000, position: [0, 0, 100] }}
        orthographic
        dpr={[1, 2]}
        linear
      >
        <CameraControls />
        <Lights />
        <Suspense fallback={null}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0xff0000} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
