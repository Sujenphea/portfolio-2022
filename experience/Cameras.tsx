import { MutableRefObject, useEffect, useRef } from 'react'

import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
  CatmullRomCurve3,
  Vector3,
  PerspectiveCamera as ThreePerspectiveCamera,
  Mesh,
} from 'three'

import { clamp } from '../utils/math'

import CameraViewType from '../types/cameraViewType'
import CameraData from '../types/cameraData'

const Cameras = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  scrollProgress: number
  cameraView: CameraViewType
  cameraData: CameraData
}) => {
  // params
  const cameraHeightOffset = useRef(1)

  // states
  const animateOverview = useRef(false) // animate first person camera's position, lookAt

  // refs
  const cameraRef = useRef<ThreePerspectiveCamera>(null!)
  const ghostMesh = useRef<Mesh>(null!) // purpose: animate camera lookAt
  const prevCameraView = useRef(CameraViewType.FirstPerson)

  // - vectors
  const newCameraPosition = useRef(new Vector3())
  const cameraHeightOffsetVector = useRef(
    new Vector3(0, cameraHeightOffset.current, 0)
  )
  const tempVector = useRef(new Vector3())

  // states
  // - change animation type in first person camera
  useEffect(() => {
    // if change from any to first person (animate for 0.6s)
    if (props.cameraView !== CameraViewType.FirstPerson) {
      animateOverview.current = true
    } else if (prevCameraView.current !== CameraViewType.FirstPerson) {
      setTimeout(() => {
        animateOverview.current = false
      }, 600)
    }

    prevCameraView.current = props.cameraView
  }, [props.cameraView])

  // tick
  // - update camera position
  useFrame(() => {
    newCameraPosition.current.copy(cameraRef.current.position)

    switch (props.cameraView) {
      case CameraViewType.FirstPerson:
        // get position on curve
        const initialProgress = clamp(props.scrollProgress, 0, 1)
        const lookAtProgress = clamp(props.scrollProgress + 0.001, 0, 1)

        // set camera position
        tempVector.current = props.curve.current.getPointAt(initialProgress)
        tempVector.current.add(cameraHeightOffsetVector.current) // position offset

        // animate if closing project
        // don't animate if scrolling
        newCameraPosition.current.lerp(
          tempVector.current,
          animateOverview.current ? 0.2 : 1
        )
        cameraRef.current.position.copy(newCameraPosition.current)

        // set camera direction
        const cameraDirection = props.curve.current.getPointAt(lookAtProgress)
        cameraDirection.add(cameraHeightOffsetVector.current) // direction offset

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
        tempVector.current.set(0, 600, 0)
        newCameraPosition.current.lerp(tempVector.current, 0.2)
        cameraRef.current.position.copy(newCameraPosition.current)

        tempVector.current.set(0, 99, 0)
        ghostMesh.current.position.lerp(tempVector.current, 0.2)
        cameraRef.current.lookAt(
          ghostMesh.current.position.x,
          ghostMesh.current.position.y,
          ghostMesh.current.position.z
        )

        cameraRef.current.rotation.z = Math.PI * 0

        return
      case CameraViewType.Project:
        // animate position
        newCameraPosition.current.lerp(props.cameraData.position, 0.2)
        cameraRef.current.position.copy(newCameraPosition.current)

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
