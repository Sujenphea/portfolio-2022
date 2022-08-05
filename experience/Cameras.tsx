import { useEffect, useRef, useState } from 'react'

import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { clamp } from './utils/math'

const Cameras = (props: {
  points: THREE.Vector3[]
  scrollProgress: number
}) => {
  // params
  const [curve] = useState(new THREE.CatmullRomCurve3(props.points))
  const cameraHeightOffset = useRef(20)

  // refs
  const position = useRef(new THREE.Vector3())
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  // tick
  // - update camera position
  useFrame(() => {
    // get position on curve
    const initialProgress = clamp(props.scrollProgress, 0, 1)
    const lookAtProgress = clamp(props.scrollProgress + 0.001, 0, 1)

    // set camera position
    position.current = curve.getPointAt(initialProgress)
    position.current.add(new THREE.Vector3(0, cameraHeightOffset.current, 0)) // position offset

    cameraRef.current.position.copy(position.current)

    // set camera direction
    const cameraDirection = curve.getPointAt(lookAtProgress)
    cameraDirection.add(new THREE.Vector3(0, cameraHeightOffset.current, 0)) // direction offset

    cameraRef.current.lookAt(cameraDirection)
  })

  return (
    <PerspectiveCamera
      makeDefault
      ref={cameraRef}
      aspect={window.innerWidth / window.innerHeight}
      fov={84}
      near={0.01}
      far={1000}
      position={[0, 0, 0]}
      onUpdate={(self) => self.updateProjectionMatrix()}
    />
  )
}

export default Cameras
