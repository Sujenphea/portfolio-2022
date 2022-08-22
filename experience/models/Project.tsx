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

const Project = (props: {
  project: ProjectType
  position: Vector3
  handleRef: (ref: Mesh<BufferGeometry, Material | Material[]> | null) => void
  handleProjectClick: () => void
}) => {
  const imageTexture = useLoader(TextureLoader, props.project.images[0])
  const ref = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    ref.current.uniforms.uTexture = { value: imageTexture }
  }, [imageTexture])

  return (
    <mesh
      position={props.position}
      ref={(ref) => {
        props.handleRef(ref)
      }}
      onClick={props.handleProjectClick}
    >
      <planeGeometry args={[12, 9]} />
      <myShaderMaterial ref={ref} />
    </mesh>
  )
}

export default Project

Project.defaultProps = {
  position: [0, 0, 0],
}
