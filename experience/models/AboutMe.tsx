import { memo, useEffect, useRef, useState } from 'react'

import { Text } from '@react-three/drei'
import * as THREE from 'three'

const AboutMe = (props: {
  curvePoints: THREE.Vector3[]
  positionOnCurve: number
}) => {
  // params
  const objectVerticalOffset = useRef(new THREE.Vector3(0, 5, 0))
  const [curve] = useState(
    new THREE.CatmullRomCurve3(props.curvePoints, false, 'catmullrom')
  )

  // refs
  const textRef = useRef<THREE.Mesh>(null!)

  // helpers
  const calculatePosition = (locationOnCurve: number) => {
    const position = curve.getPointAt(locationOnCurve)
    position.add(objectVerticalOffset.current)

    return position
  }

  // hooks
  useEffect(() => {
    // textRef position
    const position = calculatePosition(props.positionOnCurve)
    textRef.current.position.copy(position)

    // lookAtPosition
    const lookAtPosition = calculatePosition(props.positionOnCurve - 0.001)
    textRef.current.lookAt(lookAtPosition)
  }, [textRef])

  return (
    <group>
      <Text
        color="pink"
        fontSize={2}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        {`first line. \nsecond line. \nthird line.`}
      </Text>
    </group>
  )
}

export default memo(AboutMe)