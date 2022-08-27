import { Dispatch, MutableRefObject, SetStateAction } from 'react'

import { CatmullRomCurve3 } from 'three'
import { Line, ScrollControls, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import CameraViewType from '../../types/cameraViewType'

const Particles = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  setScrollProgress: Dispatch<SetStateAction<number>>
}) => {
  const scrollData = useScroll()

  // tick
  useFrame(() => {
    // update scroll progress
    props.setScrollProgress(scrollData.offset)
  })

  return (
    <Line
      points={props.curve.current.getPoints(2000)}
      color="red"
      lineWidth={3}
    />
  )
}

const SJLineScroll = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  setScrollProgress: Dispatch<SetStateAction<number>>
  cameraView: CameraViewType
}) => (
  <ScrollControls
    pages={5}
    distance={15} // scroll speed
    damping={4}
    horizontal={false}
    infinite={false}
    enabled={props.cameraView === CameraViewType.FirstPerson}
  >
    <Particles
      curve={props.curve}
      setScrollProgress={props.setScrollProgress}
    />
  </ScrollControls>
)

export default SJLineScroll
