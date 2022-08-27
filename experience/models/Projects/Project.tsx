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

import { shaderMaterial } from '@react-three/drei'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// material
const ProjectShaderMaterial = shaderMaterial(
  { uTexture: null, uOpacity: 1 },
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
  image: Texture
  position: Vector3
  closeProject: boolean
  handleRef: (ref: Mesh<BufferGeometry, Material | Material[]> | null) => void
  handleProjectClick: () => void
}

const Project = (props: Props) => {
  const shaderRef = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    shaderRef.current.uniforms.uTexture = { value: props.image }
    shaderRef.current.needsUpdate = true
  }, [])

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
