import { Dispatch, SetStateAction, useState } from 'react'

import {
  PointMaterial,
  Points,
  ScrollControls,
  useScroll,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Particles = (props: {
  points: number[][]
  setScrollProgress: Dispatch<SetStateAction<number>>
}) => {
  // hooks
  const [points] = useState(new Float32Array(props.points.flatMap((i) => i)))
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
  points: number[][]
  setScrollProgress: Dispatch<SetStateAction<number>>
}) => (
  <ScrollControls
    pages={5}
    distance={10} // scroll speed
    damping={4}
    horizontal={false}
    infinite={false}
  >
    <Particles
      points={props.points}
      setScrollProgress={props.setScrollProgress}
    />
  </ScrollControls>
)

export default SJParticlesScroll
