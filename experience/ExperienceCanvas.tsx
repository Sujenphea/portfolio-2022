import { Suspense, useState } from 'react'

import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'

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

import ProjectType from '../types/projectType'

import CameraViewType from '../types/cameraViewEnum'
import CameraData from '../types/cameraData'

const ExperienceCanvas = (props: {
  cameraView: CameraViewType
  changeCameraView: (cameraView: CameraViewType) => void
  changeProjectOverlay: (project: ProjectType) => void
}) => {
  // states
  const [scrollProgress, setScrollProgress] = useState(0)
  // - camera position when cameraView is looking at project
  const [projectCameraData, setProjectCameraData] = useState<CameraData>({
    position: new Vector3(),
    lookAt: new Vector3(),
  })

  // handlers
  // - change camera view type and position
  const handleProjectClick = (
    project: ProjectType,
    cameraPosition: Vector3,
    cameraLookAt: Vector3
  ) => {
    props.changeProjectOverlay(project)
    props.changeCameraView(CameraViewType.Project)

    setProjectCameraData({ position: cameraPosition, lookAt: cameraLookAt })
  }

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
          cameraView={props.cameraView}
          cameraData={projectCameraData}
        />
        <Suspense fallback={null}>
          <SJParticlesScroll
            points={pointsSj}
            setScrollProgress={setScrollProgress}
            cameraView={props.cameraView}
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
            projectClicked={handleProjectClick}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
