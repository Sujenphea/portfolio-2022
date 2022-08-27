import { useEffect, useRef } from 'react'

import { shaderMaterial } from '@react-three/drei'
import { extend, Object3DNode, useLoader } from '@react-three/fiber'
import {
  BufferGeometry,
  Material,
  Mesh,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector3,
} from 'three'

import ProjectType from '../../types/projectType'

import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'

const MyShaderMaterial = shaderMaterial(
  { uTexture: new Texture(), uOpacity: 1 },
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

type Props = {
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
    >
      <planeGeometry args={[12, 9]} />
      <myShaderMaterial ref={shaderRef} transparent />
    </mesh>
  )
}

export default Project

Project.defaultProps = {
  position: new Vector3(0, 0, 0),
}
