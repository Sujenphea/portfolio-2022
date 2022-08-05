import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

import Cameras from './Cameras'
import Lights from './Lights'
import Works from './models/Works'

import Projects from './models/Projects'
import SJParticlesScroll from './models/SJParticlesScroll'

import AboutMe from './models/AboutMe'
import pointsSj from './points/points-sj'
import pointsSjCamera from './points/points-sj-camera'

import projectsJSON from './data/projects.json'
import worksJSON from './data/works.json'

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
        <Cameras points={pointsSjCamera} scrollProgress={scrollProgress} />
        <Suspense fallback={null}>
          <SJParticlesScroll
            points={pointsSj}
            setScrollProgress={setScrollProgress}
          />
          <AboutMe curvePoints={pointsSjCamera} positionOnCurve={0.01} />
          <Works
            curvePoints={pointsSjCamera}
            projects={worksJSON}
            rangeOnCurve={[0.01, 0.5]}
          />
          <Projects
            curvePoints={pointsSjCamera}
            projects={projectsJSON}
            rangeOnCurve={[0.5, 1]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
