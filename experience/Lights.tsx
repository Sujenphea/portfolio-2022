import { useRef } from 'react'

import { useHelper } from '@react-three/drei'
import { PointLight, PointLightHelper } from 'three'

const Lights = () => {
  const pointLight = useRef<PointLight>(null!)

  useHelper(pointLight, PointLightHelper, 1, 'pink')

  return (
    <group>
      <ambientLight />
      <pointLight ref={pointLight} position={[5, 5, 0]} intensity={5} />
    </group>
  )
}

export default Lights
