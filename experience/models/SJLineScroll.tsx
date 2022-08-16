import { Dispatch, SetStateAction, useState } from 'react'

import { CatmullRomCurve3, Vector3 } from 'three'
import { Line, ScrollControls, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import CameraViewType from '../../types/cameraViewEnum'

const Particles = (props: {
  points: Vector3[]
  setScrollProgress: Dispatch<SetStateAction<number>>
}) => {
  // hooks
  const [curve] = useState(
    new CatmullRomCurve3(props.points, false, 'catmullrom')
  )

  const scrollData = useScroll()

  // tick
  useFrame(() => {
    // update scroll progress
    props.setScrollProgress(scrollData.offset)
  })

  return <Line points={curve.getPoints(1200)} color="red" lineWidth={3} />
}

const SJLineScroll = (props: {
  points: Vector3[]
  setScrollProgress: Dispatch<SetStateAction<number>>
  cameraView: CameraViewType
}) => (
  <ScrollControls
    pages={5}
    distance={10} // scroll speed
    damping={4}
    horizontal={false}
    infinite={false}
    enabled={props.cameraView === CameraViewType.FirstPerson}
  >
    <Particles
      points={props.points}
      setScrollProgress={props.setScrollProgress}
    />
  </ScrollControls>
)

export default SJLineScroll
