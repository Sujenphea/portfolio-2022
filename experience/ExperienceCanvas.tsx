import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Cameras from './Cameras'
import Lights from './Lights'
import SJParticlesScroll from './models/SJParticlesScroll'
import pointsSjVector from './points/points-sj-vector'

function ExperienceCanvas() {
  // states
  const [scrollProgress, setScrollProgress] = useState(0)

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
        <Cameras points={pointsSjVector} scrollProgress={scrollProgress} />
        <Suspense fallback={null}>
          <SJParticlesScroll setScrollProgress={setScrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
