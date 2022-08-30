import { MutableRefObject } from 'react'

import { Line, ScrollControls, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CatmullRomCurve3 } from 'three'

import CameraViewType from '../../types/cameraViewType'

const Particles = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  handleScrollProgress: (value: number) => void
}) => {
  const scrollData = useScroll()

  // tick
  useFrame(() => {
    // update scroll progress
    props.handleScrollProgress(scrollData.offset)
  })

  return (
    <Line
      points={props.curve.current.getPoints(2000)}
      color="rgb(100, 100, 255)"
      lineWidth={3}
    />
  )
}

const SJLineScroll = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  handleScrollProgress: (value: number) => void
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
      handleScrollProgress={props.handleScrollProgress}
    />
  </ScrollControls>
)

export default SJLineScroll
