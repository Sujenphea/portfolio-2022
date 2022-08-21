import { Suspense, useEffect, useRef, useState } from 'react'

import { Canvas, extend, Object3DNode, useLoader } from '@react-three/fiber'
import { ShaderMaterial, Texture, TextureLoader, Vector3 } from 'three'
import { Box, shaderMaterial } from '@react-three/drei'

import Cameras from './Cameras'

import AboutMe from './models/AboutMe'
import Works from './models/Works'
import Projects from './models/Projects'
import SJLineScroll from './models/SJLineScroll'

import pointsSj from './points/points-sj'

import projectsJSON from '../data/projects.json'
import worksJSON from '../data/works.json'

import ProjectType from '../types/projectType'

import CameraViewType from '../types/cameraViewType'
import CameraData from '../types/cameraData'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

const ExperienceCanvas = (props: {
  cameraView: CameraViewType
  handleProjectClicked: (
    project: ProjectType,
    cameraView: CameraViewType
  ) => void
  isPortrait: boolean // get orientation to adjust project focused camera location
  currentProject: ProjectType // if nil, save calculation cost of dynamic project size
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
    props.handleProjectClicked(project, CameraViewType.Project)

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
        <Cameras
          points={pointsSj}
          scrollProgress={scrollProgress}
          cameraView={props.cameraView}
          cameraData={projectCameraData}
        />
        <Suspense fallback={null}>
          <SJLineScroll
            points={pointsSj}
            setScrollProgress={setScrollProgress}
            cameraView={props.cameraView}
          />
          <AboutMe curvePoints={pointsSj} positionOnCurve={0.01} />
          <Works
            curvePoints={pointsSj}
            projects={worksJSON}
            rangeOnCurve={[0.01, 0.5]}
          />
          <Projects
            curvePoints={pointsSj}
            projects={projectsJSON}
            rangeOnCurve={[0.5, 1]}
            projectClicked={handleProjectClick}
            handleNewLocation={(data: CameraData) => {
              setProjectCameraData(data)
            }}
            isPortrait={props.isPortrait}
            currentProject={props.currentProject}
          />
        </Suspense>
        <TestObject />
      </Canvas>
    </div>
  )
}

const MyShaderMaterial = shaderMaterial(
  { uTexture: new Texture() },
  vertexShader,
  fragmentShader
)
extend({ MyShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      myShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

const TestObject = () => {
  const imageTexture = useLoader(TextureLoader, './testImage.png')
  const ref = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    ref.current.uniforms.uTexture = { value: imageTexture }
  }, [imageTexture])

  return (
    <mesh position={[5, 0, 0]}>
      <planeGeometry args={[12, 9]} />
      <myShaderMaterial ref={ref} />
    </mesh>
  )
}

export default ExperienceCanvas
