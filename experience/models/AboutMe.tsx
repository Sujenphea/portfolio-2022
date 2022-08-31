import { memo, MutableRefObject, useEffect, useRef } from 'react'

import { Text } from '@react-three/drei'
import { CatmullRomCurve3, Vector3 } from 'three'

const AboutMe = (props: {
  curve: MutableRefObject<CatmullRomCurve3>
  positionOnCurve: number
}) => {
  // params
  const objectVerticalOffset = useRef(new Vector3(0, 5, 0))

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
        color="rgb(30, 30, 50)"
        fontSize={2}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        {`Hi! I'm Sujen. I am a frontend web and mobile developer based in New Zealand.\nI am currently finishing my studies majoring in Computer Science.\nFeel free to reach out about a project, collaboration or say a friendly hello!`}
      </Text>
    </group>
  )
}

export default memo(AboutMe)
