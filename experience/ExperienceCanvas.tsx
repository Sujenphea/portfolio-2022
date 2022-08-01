import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Cameras from './Cameras'
import Lights from './Lights'
import SJParticles from './models/SJParticles'
import pointsSj from './points/points-sj'
import pointsSjVector from './points/points-sj-vector'

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
      <Canvas dpr={[1, 2]} linear>
        <Lights />
        <Cameras points={pointsSjVector} />
        <Suspense fallback={null}>
          <SJParticles points={pointsSj} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
