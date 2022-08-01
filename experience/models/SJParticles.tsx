import { PointMaterial, Points } from '@react-three/drei'
import { useState } from 'react'

const SJParticles = (props: { points: number[][] }) => {
  const [points] = useState(new Float32Array(props.points.flatMap((i) => i)))

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

export default SJParticles
