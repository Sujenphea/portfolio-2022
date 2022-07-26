import { Suspense, useRef } from 'react'

import { Canvas } from '@react-three/fiber'
import { CatmullRomCurve3, Vector3 } from 'three'

import Cameras from './Cameras'

import Projects from './models/Projects/Projects'
import SJLineScroll from './models/SJLineScroll'

import pointsSj from './points/points-sj'

import Heading from './models/Heading'
import CenteredText from './models/CenteredText'

import projectsJSON from '../data/projects.json'
import worksJSON from '../data/works.json'

import ProjectType from '../types/projectType'

import CameraViewType from '../types/cameraViewType'
import CameraData from '../types/cameraData'

type Props = {
  cameraView: CameraViewType
  handleProjectClicked: (
    project: ProjectType,
    cameraView: CameraViewType
  ) => void
  isPortrait: boolean // get orientation to adjust project focused camera location
  currentProject: ProjectType // if nil, save calculation cost of dynamic project size
}

const ExperienceCanvas = (props: Props) => {
  // refs
  const curve = useRef(new CatmullRomCurve3(pointsSj, false, 'catmullrom'))
  const scrollProgress = useRef(0)
  // - camera position when cameraView is looking at project
  const projectCameraData = useRef({
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
    props.handleProjectClicked(project, CameraViewType.Project)

    projectCameraData.current = {
      position: cameraPosition,
      lookAt: cameraLookAt,
    }
  }

  const handleScrollProgress = (value: number) => {
    scrollProgress.current = value
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
        <Cameras
          curve={curve}
          scrollProgress={scrollProgress}
          cameraView={props.cameraView}
          cameraData={projectCameraData}
        />
        <fog attach="fog" args={['rgb(200, 200, 255)', 30, 100]} />
        <Suspense fallback={null}>
          <SJLineScroll
            curve={curve}
            handleScrollProgress={handleScrollProgress}
            cameraView={props.cameraView}
          />
          <CenteredText
            text={`Hi! I'm Sujen. I am a frontend web and mobile developer based in New Zealand.\nI am currently finishing my studies majoring in Computer Science.\nFeel free to reach out about a project, collaboration or say a friendly hello!`}
            curve={curve}
            positionOnCurve={0.03}
          />
          <Heading curve={curve} positionOnCurve={0.07} text="projects" />
          <Projects
            curve={curve}
            projects={projectsJSON}
            rangeOnCurve={[0.07, 0.2]}
            currentCameraLocation={scrollProgress}
            projectClicked={handleProjectClick}
            handleNewLocation={(data: CameraData) => {
              projectCameraData.current = data
            }}
            isPortrait={props.isPortrait}
            currentProject={props.currentProject}
          />
          <Heading curve={curve} positionOnCurve={0.21} text="works" />
          <Projects
            curve={curve}
            projects={worksJSON}
            rangeOnCurve={[0.22, 0.3]}
            currentCameraLocation={scrollProgress}
            projectClicked={handleProjectClick}
            handleNewLocation={(data: CameraData) => {
              projectCameraData.current = data
            }}
            isPortrait={props.isPortrait}
            currentProject={props.currentProject}
          />
          <CenteredText
            text={`Stay tuned for more\nexciting projects!\n(or scroll if you're bored)`}
            curve={curve}
            positionOnCurve={0.34}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
