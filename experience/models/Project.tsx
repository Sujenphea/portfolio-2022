import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { shaderMaterial } from '@react-three/drei'
import { extend, Object3DNode, useFrame, useLoader } from '@react-three/fiber'
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
import AnimateHandle from '../../types/animateHandlerType'

import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'

import { Tween, update } from '@tweenjs/tween.js'

const MyShaderMaterial = shaderMaterial(
  { uTexture: new Texture(), uOpacity: 1, uScale: 1 },
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
  handleRef: (ref: Mesh<BufferGeometry, Material | Material[]> | null) => void
  handleProjectClick: () => void
}

const Project = forwardRef<AnimateHandle, Props>((props, forwardedRef) => {
  const imageTexture = useLoader(TextureLoader, props.project.images[0])
  const shaderRef = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    shaderRef.current.uniforms.uTexture = { value: imageTexture }
  }, [imageTexture])

  // animation frame
  // - update image scroll
  const animate = (time: number) => {
    update(time) // tween update
  }

  // handle render animation frame
  useImperativeHandle(forwardedRef, () => ({
    animate(time: number) {
      animate(time)
    },
  }))

  return (
    <mesh
      position={props.position}
      ref={(ref) => {
        props.handleRef(ref)
      }}
      onClick={() => {
        props.handleProjectClick()

        new Tween({ x: 1 })
          .to({ x: 0.5 }, 500)
          .onUpdate(({ x }) => {
            shaderRef.current.uniforms.uScale = { value: x }
          })
          .start()
      }}
    >
      <planeGeometry args={[12, 9]} />
      <myShaderMaterial ref={shaderRef} />
    </mesh>
  )
})

export default Project

Project.defaultProps = {
  position: new Vector3(0, 0, 0),
}
