import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

import Cameras from './Cameras'
import Lights from './Lights'

import Projects from './models/Projects'
import SJParticlesScroll from './models/SJParticlesScroll'

import pointsSj from './points/points-sj'
import pointsSjCamera from './points/points-sj-camera'

function ExperienceCanvas() {
  // states
  const [scrollProgress, setScrollProgress] = useState(0)
  const [projects] = useState(['a', 'b', 'c', 'd', 'e'])

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
        <Cameras points={pointsSjCamera} scrollProgress={scrollProgress} />
        <Suspense fallback={null}>
          <SJParticlesScroll
            points={pointsSj}
            setScrollProgress={setScrollProgress}
          />
          <Projects
            curvePoints={pointsSjCamera}
            projects={projects}
            rangeOnCurve={[0, 0.5]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
