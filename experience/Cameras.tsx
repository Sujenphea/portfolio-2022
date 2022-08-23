import { useEffect, useRef, useState } from 'react'

import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Vector3 } from 'three'

import { clamp } from '../utils/math'

import CameraViewType from '../types/cameraViewType'
import CameraData from '../types/cameraData'

const Cameras = (props: {
  points: THREE.Vector3[]
  scrollProgress: number
  cameraView: CameraViewType
  cameraData: CameraData
}) => {
  // params
  const [curve] = useState(new THREE.CatmullRomCurve3(props.points))
  const cameraHeightOffset = useRef(1)

  // states
  const animateOverview = useRef(false) // animate first person camera's position, lookAt

  // refs
  const position = useRef(new THREE.Vector3())
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const ghostMesh = useRef<THREE.Mesh>(null!) // purpose: animate camera lookAt
  const prevCameraView = useRef(CameraViewType.FirstPerson)

  // states
  // - change animation type in first person camera
  useEffect(() => {
    // if change from any to first person (animate for 0.6s)
    if (props.cameraView !== CameraViewType.FirstPerson) {
      animateOverview.current = true
    } else if (prevCameraView.current !== CameraViewType.FirstPerson) {
      console.log('timeout')
      setTimeout(() => {
        animateOverview.current = false
      }, 600)
    }

    prevCameraView.current = props.cameraView
  }, [props.cameraView])

  // tick
  // - update camera position
  useFrame(() => {
    const newCameraPosition = new Vector3().copy(cameraRef.current.position)

    switch (props.cameraView) {
      case CameraViewType.FirstPerson:
        // get position on curve
        const initialProgress = clamp(props.scrollProgress, 0, 1)
        const lookAtProgress = clamp(props.scrollProgress + 0.001, 0, 1)

        // set camera position
        position.current = curve.getPointAt(initialProgress)
        position.current.add(
          new THREE.Vector3(0, cameraHeightOffset.current, 0)
        ) // position offset

        // animate if closing project
        // don't animate if scrolling
        newCameraPosition.lerp(
          position.current,
          animateOverview.current ? 0.2 : 1
        )
        cameraRef.current.position.copy(newCameraPosition)

        // set camera direction
        const cameraDirection = curve.getPointAt(lookAtProgress)
        cameraDirection.add(new THREE.Vector3(0, cameraHeightOffset.current, 0)) // direction offset

        ghostMesh.current.position.lerp(
          cameraDirection,
          animateOverview.current ? 0.2 : 1
        )
        cameraRef.current.lookAt(
          ghostMesh.current.position.x,
          ghostMesh.current.position.y,
          ghostMesh.current.position.z
        )

        return
      case CameraViewType.Overview:
        newCameraPosition.lerp(new THREE.Vector3(0, 600, 0), 0.2)
        cameraRef.current.position.copy(newCameraPosition)

        ghostMesh.current.position.lerp(new THREE.Vector3(0, 99, 0), 0.2)
        cameraRef.current.lookAt(
          ghostMesh.current.position.x,
          ghostMesh.current.position.y,
          ghostMesh.current.position.z
        )

        cameraRef.current.rotation.z = Math.PI * 0

        return
      case CameraViewType.Project:
        // animate position
        newCameraPosition.lerp(props.cameraData.position, 0.2)
        cameraRef.current.position.copy(newCameraPosition)

        // aniamte lookAt
        ghostMesh.current.position.lerp(props.cameraData.lookAt, 0.2)
        cameraRef.current.lookAt(
          ghostMesh.current.position.x,
          ghostMesh.current.position.y,
          ghostMesh.current.position.z
        )

        return
    }
  })

  return (
    <group>
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
      <mesh ref={ghostMesh}>
        <boxGeometry args={[0, 0, 0]} />
      </mesh>
    </group>
  )
}

export default Cameras
