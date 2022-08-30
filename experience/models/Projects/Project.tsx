import { MutableRefObject, useEffect, useRef } from 'react'

import { extend, Object3DNode, useFrame } from '@react-three/fiber'
import {
  BufferGeometry,
  Material,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  Vector3,
} from 'three'
import { lerp } from 'three/src/math/MathUtils'
import { shaderMaterial } from '@react-three/drei'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// material
const ProjectShaderMaterial = shaderMaterial(
  { uTexture: null, uOpacity: 1, uDistance: 0 },
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
  cameraLocation: MutableRefObject<number>
  projectLocation: number
}

const Project = (props: Props) => {
  const shaderRef = useRef<ShaderMaterial>(null!)
  const currentOpacity = useRef(1)
  const idealOpacity = useRef(1)

  useEffect(() => {
    shaderRef.current.uniforms.uTexture = { value: props.image }
    shaderRef.current.uniforms.uOpacity = { value: 1 }
    shaderRef.current.uniforms.uDistance = { value: 0 }
    shaderRef.current.needsUpdate = true
  }, [])

  useEffect(() => {
    if (props.closeProject) {
      idealOpacity.current = 1
    }
  }, [props.closeProject])

  useFrame(() => {
    currentOpacity.current = shaderRef.current.uniforms.uOpacity.value
    shaderRef.current.uniforms.uOpacity = {
      value: lerp(currentOpacity.current, idealOpacity.current, 0.1),
    }

    // multiplied by 30 to magnify distance
    shaderRef.current.uniforms.uDistance = {
      value: (props.cameraLocation.current - props.projectLocation) * 30,
    }
  })

  // handlers
  const handleProjectClick = () => {
    props.handleProjectClick()

    idealOpacity.current = 0
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
