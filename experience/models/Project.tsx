import { useRef, useEffect } from 'react'

import { Texture, ShaderMaterial, TextureLoader } from 'three'
import { extend, Object3DNode, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

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

const Project = () => {
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

export default Project
