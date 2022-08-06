import { Suspense, useState } from 'react'

import { Canvas } from '@react-three/fiber'

import Cameras from './Cameras'
import Lights from './Lights'

import AboutMe from './models/AboutMe'
import Works from './models/Works'
import Projects from './models/Projects'
import SJParticlesScroll from './models/SJParticlesScroll'

import pointsSj from './points/points-sj'
import pointsSjCamera from './points/points-sj-camera'

import projectsJSON from '../data/projects.json'
import worksJSON from '../data/works.json'

import CameraViewType from '../types/cameraViewEnum'

const ExperienceCanvas = (props: { menuVisible: boolean }) => {
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

        zIndex: 0,
      }}
    >
      <Canvas dpr={[1, 2]} linear>
        <Lights />
        <Cameras
          points={pointsSjCamera}
          scrollProgress={scrollProgress}
          cameraView={
            props.menuVisible
              ? CameraViewType.Overview
              : CameraViewType.FirstPerson
          }
        />
        <Suspense fallback={null}>
          <SJParticlesScroll
            points={pointsSj}
            setScrollProgress={setScrollProgress}
            cameraView={
              props.menuVisible
                ? CameraViewType.Overview
                : CameraViewType.FirstPerson
            }
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
