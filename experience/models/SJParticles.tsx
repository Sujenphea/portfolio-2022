import { PointMaterial, Points } from '@react-three/drei'
import { useState } from 'react'
import pointsSj from '../points/points-sj'

const TestPoints = () => {
  const [points] = useState(new Float32Array(pointsSj.flatMap((i) => i)))
  const [color] = useState(
    Float32Array.from({ length: points.length }, () => Math.random())
  )

  return (
    <Points positions={points} colors={color}>
      <PointMaterial
        transparent
        vertexColors
        size={4}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </Points>
  )
}

export default TestPoints
