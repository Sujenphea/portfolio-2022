import { useEffect, useRef } from 'react'

import { extend, Object3DNode, useLoader } from '@react-three/fiber'
import {
  BufferGeometry,
  Material,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector3,
} from 'three'

import ProjectType from '../../../types/projectType'
import { shaderMaterial } from '@react-three/drei'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// material
const ProjectShaderMaterial = shaderMaterial(
  { uTexture: new Texture(), uOpacity: 1 },
  vertexShader,
  fragmentShader
)

extend({ ProjectShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      projectShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

// project
type Props = {
  geometry: PlaneGeometry
  project: ProjectType
  position: Vector3
  closeProject: boolean
  handleRef: (ref: Mesh<BufferGeometry, Material | Material[]> | null) => void
  handleProjectClick: () => void
}

const Project = (props: Props) => {
  const imageTexture = useLoader(TextureLoader, props.project.images[0])
  const shaderRef = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    shaderRef.current.uniforms.uTexture = { value: imageTexture }
    shaderRef.current.needsUpdate = true
  }, [imageTexture])

  // handlers
  const handleProjectClick = () => {
    props.handleProjectClick()
  }

  return (
    <mesh
      position={props.position}
      ref={(ref) => {
        props.handleRef(ref)
      }}
      onClick={handleProjectClick}
      geometry={props.geometry}
    >
      <projectShaderMaterial ref={shaderRef} transparent />
    </mesh>
  )
}

export default Project

Project.defaultProps = {
  position: new Vector3(0, 0, 0),
}