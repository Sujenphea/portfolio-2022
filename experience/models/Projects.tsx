import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh, Vector3 } from 'three'

const Projects = (props: { curvePoints: Vector3[]; projects: string[] }) => {
  // params
  const objectOffset = useRef(new Vector3(-10, 15, 0))
  const lookAtPositionOffset = useRef(-0.01)
  const [curve] = useState(
    new THREE.CatmullRomCurve3(props.curvePoints, false, 'catmullrom')
  )

  // refs
  const meshRefs = useRef<
    (Mesh<BufferGeometry, Material | Material[]> | null)[]
  >([])

  useEffect(() => {
    // set length for ref
    meshRefs.current = meshRefs.current.slice(0, props.projects.length)

    // set mesh rotation
    meshRefs.current.forEach((ref, i) => {
      const location = (i + 1) / (props.projects.length + 1)

      const lookAtPosition = curve.getPointAt(
        location + lookAtPositionOffset.current
      )
      lookAtPosition.add(objectOffset.current)

      ref?.lookAt(lookAtPosition)
    })
  }, [props.projects.length])

  return (
    <group>
      {/* render projects */}
      {props.projects.map((name, i) => {
        // place first project further into the curve
        const location = (i + 1) / (props.projects.length + 1)

        // get position
        const position = curve.getPointAt(location)
        position.add(objectOffset.current)

        return (
          <mesh
            position={position}
            ref={(ref) => {
              meshRefs.current[i] = ref
            }}
          >
            <planeGeometry args={[12, 9]} />
            <meshBasicMaterial color={0x00ff00} />
          </mesh>
        )
      })}
    </group>
  )
}

export default Projects
