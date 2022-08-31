import { memo, MutableRefObject, useEffect, useRef } from 'react'

import { Text } from '@react-three/drei'
import { CatmullRomCurve3, Vector3 } from 'three'

const CenteredText = (props: {
  text: string
  curve: MutableRefObject<CatmullRomCurve3>
  positionOnCurve: number
}) => {
  // params
  const objectVerticalOffset = useRef(new Vector3(0, 4, 0))

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
    const lookAtPosition = calculatePosition(props.positionOnCurve - 0.01)
    textRef.current.lookAt(lookAtPosition)
  }, [textRef])

  return (
    <group>
      <Text
        color="rgb(30, 30, 50)"
        fontSize={2}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        {props.text}
      </Text>
    </group>
  )
}

export default CenteredText
