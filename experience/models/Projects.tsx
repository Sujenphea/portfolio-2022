import { memo, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh, Vector3 } from 'three'
import { Text } from '@react-three/drei'

const Projects = (props: { curvePoints: Vector3[]; projects: string[] }) => {
  // params
  const objectVerticalOffset = useRef(new Vector3(0, 10, 0))
  const objectNormalMultiplier = useRef(10) // horizontal displacement of object
  const lookAtPositionOffset = useRef(-0.01)
  const [curve] = useState(
    new THREE.CatmullRomCurve3(props.curvePoints, false, 'catmullrom')
  )

  // refs
  const meshRefs = useRef<
    (Mesh<BufferGeometry, Material | Material[]> | null)[]
  >([])
  const textRef = useRef<Mesh>(null!)

  // helpers
  const calculatePosition = (
    locationOnCurve: number,
    side: number // 1 for left side, -1 for right side
  ) => {
    const position = curve.getPointAt(locationOnCurve)
    position.add(objectVerticalOffset.current)

    // get normal to curve
    const tangent = curve.getTangentAt(locationOnCurve)
    const normal = new Vector3()
      .copy(tangent)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5)
      .normalize()
    position.add(normal.multiplyScalar(side * objectNormalMultiplier.current))

    return position
  }

  // hooks
  useEffect(() => {
    // set length for ref
    meshRefs.current = meshRefs.current.slice(0, props.projects.length)

    // set mesh rotation
    meshRefs.current.forEach((ref, i) => {
      const location = (i + 1) / (props.projects.length + 1)

      const lookAtPosition = calculatePosition(
        location + lookAtPositionOffset.current,
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
    // textRef.current.children
  }

  return (
    <group>
      {/* render projects */}
      {props.projects.map((name, i) => {
        // place first project further into the curve
        const location = (i + 1) / (props.projects.length + 1)

        // position
        const position = calculatePosition(location, 1)

        return (
          <mesh
            position={position}
            ref={(ref) => {
              meshRefs.current[i] = ref
            }}
            onClick={() => {
              handleProjectClick(name, location)
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
        hello world!
      </Text>
    </group>
  )
}

export default memo(Projects)
