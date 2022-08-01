import {
  PointMaterial,
  Points,
  ScrollControls,
  useScroll,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Dispatch, SetStateAction, useState } from 'react'
import pointsSj from '../points/points-sj'

const Particles = (props: {
  setScrollProgress: Dispatch<SetStateAction<number>>
}) => {
  // hooks
  const [points] = useState(new Float32Array(pointsSj.flatMap((i) => i)))
  const scrollData = useScroll()

  // tick
  useFrame(() => {
    // update scroll progress
    props.setScrollProgress(scrollData.offset)
  })

  return (
    <Points positions={points}>
      <PointMaterial
        color={0xff0000}
        size={4}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </Points>
  )
}

const SJParticlesScroll = (props: {
  setScrollProgress: Dispatch<SetStateAction<number>>
}) => (
  <ScrollControls
    pages={5}
    distance={10} // scroll speed
    damping={4}
    horizontal={false}
    infinite={false}
  >
    <Particles setScrollProgress={props.setScrollProgress} />
  </ScrollControls>
)

export default SJParticlesScroll
