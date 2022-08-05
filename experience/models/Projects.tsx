import { memo, useEffect, useRef, useState } from 'react'

import { Text } from '@react-three/drei'
import * as THREE from 'three'

import ProjectType from '../types/projectType'

const Projects = (props: {
  curvePoints: THREE.Vector3[]
  projects: ProjectType[]
  rangeOnCurve: number[] // place projects on a certain section of curve
}) => {
  // params
  const objectVerticalOffset = useRef(new THREE.Vector3(0, 10, 0))
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

  // helpers
  const calculatePosition = (
    locationOnCurve: number,
    side: number // 1 for left side, -1 for right side
  ) => {
    const position = curve.getPointAt(locationOnCurve)
    position.add(objectVerticalOffset.current)

    // get normal to curve
    const tangent = curve.getTangentAt(locationOnCurve)
    const normal = new THREE.Vector3()
      .copy(tangent)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5)
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
            <meshBasicMaterial color={0x00ff00} />
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

export default memo(Projects)
