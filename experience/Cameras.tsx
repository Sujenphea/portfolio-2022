import { useRef, useState } from 'react'

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

  // refs
  const position = useRef(new THREE.Vector3())
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const ghostMesh = useRef<THREE.Mesh>(null!)

  // tick
  // - update camera position
  useFrame(() => {
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

        cameraRef.current.position.copy(position.current)

        // set camera direction
        const cameraDirection = curve.getPointAt(lookAtProgress)
        cameraDirection.add(new THREE.Vector3(0, cameraHeightOffset.current, 0)) // direction offset

        cameraRef.current.lookAt(cameraDirection)

        return
      case CameraViewType.Overview:
        cameraRef.current.position.copy(new THREE.Vector3(0, 600, 0))
        cameraRef.current.lookAt(new THREE.Vector3(0, 99, 0))

        return
      case CameraViewType.Project:
        const newCameraPosition = new Vector3().copy(cameraRef.current.position)
        newCameraPosition.lerp(props.cameraData.position, 0.2)

        cameraRef.current.position.copy(newCameraPosition)

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
        <boxBufferGeometry attach="geometry" args={[0.1, 0.08, 0.003]} />
        <meshBasicMaterial wireframe color="red" />
      </mesh>
    </group>
  )
}

export default Cameras
