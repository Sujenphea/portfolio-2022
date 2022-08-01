import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'

const Cameras = (props: { points: Vector3[] }) => {
  // params
  const [curve] = useState(new THREE.CatmullRomCurve3(props.points))
  const loopDuration = useRef(60)
  const cameraHeightOffset = useRef(20)

  // refs
  const position = useRef(new Vector3())
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  // tick
  // - update camera position
  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    const loop = loopDuration.current

    // time
    const timeOne = (time % loop) / loop // timestamp for initial position
    const timeTwo = ((time + 1) % loop) / loop // timestamp for next position

    // set camera position
    position.current = curve.getPointAt(timeOne)
    position.current.add(new Vector3(0, cameraHeightOffset.current, 0)) // position offset

    cameraRef.current.position.copy(position.current)

    // set camera direction
    const cameraDirection = curve.getPointAt(timeTwo)
    cameraDirection.add(new Vector3(0, cameraHeightOffset.current, 0)) // direction offset

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
