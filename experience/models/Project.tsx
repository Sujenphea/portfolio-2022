import { useRef, useEffect } from 'react'

import { Texture, ShaderMaterial, TextureLoader, Vector3 } from 'three'
import { extend, Object3DNode, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

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

const Project = (props: { project: ProjectType; position: number[] }) => {
  const imageTexture = useLoader(TextureLoader, props.project.images[0])
  const ref = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    ref.current.uniforms.uTexture = { value: imageTexture }
  }, [imageTexture])

  return (
    <mesh position={new Vector3(...props.position)}>
      <planeGeometry args={[12, 9]} />
      <myShaderMaterial ref={ref} />
    </mesh>
  )
}

export default Project

Project.defaultProps = {
  position: [0, 0, 0],
}
