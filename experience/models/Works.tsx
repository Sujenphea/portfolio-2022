import { memo, useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { Text } from '@react-three/drei'

import ProjectType from '../../types/projectType'
import { Vector3 } from 'three'

const Works = (props: {
  curvePoints: THREE.Vector3[]
  projects: ProjectType[]
  rangeOnCurve: number[] // place projects on a certain section of curve
}) => {
  // params
  const objectVerticalOffset = useRef(10)
  const objectNormalMultiplier = useRef(10) // horizontal displacement of object
  const lookAtPositionOffset = useRef(-0.01)
  const [curve] = useState(
    new THREE.CatmullRomCurve3(props.curvePoints, false, 'catmullrom')
  )

  // state
  const [projectDescription, setProjectDescription] = useState('hello world')

  // refs
  const meshRefs = useRef<
    (THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    > | null)[]
  >([])
  const textRef = useRef<THREE.Mesh>(null!)

  // - vectors
  const tempVector = useRef(new Vector3())
  const verticalUnitVector = useRef(new Vector3(0, 1, 0))

  // helpers
  const calculatePosition = (
    locationOnCurve: number,
    side: number // 1 for left side, -1 for right side
  ) => {
    const position = curve.getPointAt(locationOnCurve)
    position.add(tempVector.current.set(0, objectVerticalOffset.current, 0))

    // get normal to curve
    const tangent = curve.getTangentAt(locationOnCurve)
    const normal = tempVector.current
      .copy(tangent)
      .applyAxisAngle(verticalUnitVector.current, Math.PI * 0.5)
      .normalize()
    position.add(normal.multiplyScalar(side * objectNormalMultiplier.current))

    return position
  }

  const numberLinearConverstion = (
    value: number,
    oldRange: number[],
    newRange: number[]
  ) => {
    // o = (OldMax - OldMin)
    // n = (NewMax - NewMin)
    // NewValue = (((OldValue - OldMin) * n) / o) + NewMin

    const oldDiff = oldRange[1] - oldRange[0]
    const newDiff = newRange[1] - newRange[0]

    return ((value - oldRange[0]) * newDiff) / oldDiff + newRange[0]
  }

  // hooks
  useEffect(() => {
    // set length for ref
    meshRefs.current = meshRefs.current.slice(0, props.projects.length)

    // set mesh rotation
    meshRefs.current.forEach((ref, i) => {
      const location = (i + 1) / (props.projects.length + 1)
      const normalisedLocation = numberLinearConverstion(
        location,
        [0, 1],
        props.rangeOnCurve
      )

      const lookAtPosition = calculatePosition(
        normalisedLocation + lookAtPositionOffset.current,
        1
      )

      ref?.lookAt(lookAtPosition)
    })
  }, [props.projects.length])

  // handlers
  const handleProjectClick = (name: string, location: number) => {
    textRef.current.visible = !textRef.current.visible

    // get position
    const position = calculatePosition(location, -1)
    textRef.current.position.copy(position)

    // get lookAt Position
    const lookAtPosition = calculatePosition(
      location + lookAtPositionOffset.current,
      -1
    )
    textRef.current.lookAt(lookAtPosition)

    // modify text
    setProjectDescription(`${name}`)
  }

  return (
    <group>
      {/* render projects */}
      {props.projects.map((project, i) => {
        // place first project further into the curve
        const location = (i + 1) / (props.projects.length + 1)
        const normalisedLocation = numberLinearConverstion(
          location,
          [0, 1],
          props.rangeOnCurve
        )

        // position
        const position = calculatePosition(normalisedLocation, 1)

        return (
          <mesh
            key={project.name + i.toString()}
            position={position}
            ref={(ref) => {
              meshRefs.current[i] = ref
            }}
            onClick={() => {
              handleProjectClick(project.name, normalisedLocation)
            }}
          >
            <planeGeometry args={[12, 9]} />
            <meshBasicMaterial color={0x00ffff} />
          </mesh>
        )
      })}
      <Text
        color="pink"
        fontSize={2}
        visible={false}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        {projectDescription}
      </Text>
    </group>
  )
}

export default memo(Works)
