import { MutableRefObject, useEffect, useRef } from 'react'

import { Text } from '@react-three/drei'
import { CatmullRomCurve3, Vector3 } from 'three'

const Heading = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  positionOnCurve: number
  text: string
}) => {
  // params
  const objectVerticalOffset = useRef(new Vector3(0, 2, 0))

  // refs
  const textRef = useRef<THREE.Mesh>(null!)

  // helpers
  const calculatePosition = (locationOnCurve: number) => {
    const position = props.curve.current.getPointAt(locationOnCurve)
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
        color="rgb(255, 100, 180)"
        strokeWidth={0}
        fontSize={5}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        {props.text.toUpperCase()}
      </Text>
    </group>
  )
}

export default Heading
