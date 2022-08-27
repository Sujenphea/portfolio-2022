import { useEffect, useRef, useState } from 'react'

import {
  BufferGeometry,
  CatmullRomCurve3,
  Material,
  Mesh,
  PlaneGeometry,
  Vector3,
} from 'three'

import Project from './Project'

import ProjectType from '../../../types/projectType'
import CameraData from '../../../types/cameraData'

type Props = {
  curvePoints: Vector3[]
  projects: ProjectType[]
  rangeOnCurve: number[] // place projects on a certain section of curve
  projectClicked: (
    project: ProjectType,
    cameraPosition: Vector3,
    cameraLookAt: Vector3
  ) => void
  handleNewLocation: (data: CameraData) => void
  isPortrait: boolean
  currentProject: ProjectType
}

const Projects = (props: Props) => {
  // params
  const objectVerticalOffset = useRef(5)
  const objectNormalMultiplier = useRef(8) // horizontal displacement of object
  const lookAtPositionOffset = useRef(-0.005)
  const curve = useRef(
    new CatmullRomCurve3(props.curvePoints, false, 'catmullrom')
  )

  // states
  const currentProject = useRef<ProjectType | null>(null)
  const currentProjectLocation = useRef(0)
  const currentProjectIndex = useRef(-1)
  const [closeProjectIndex, setCloseProjectIndex] = useState(-1)

  // refs
  const meshRefs = useRef<
    (Mesh<BufferGeometry, Material | Material[]> | null)[]
  >([])
  const projectGeometry = useRef(new PlaneGeometry(12, 9))

  // - vectors
  const tempVector = useRef(new Vector3())
  const verticalUnitVector = useRef(new Vector3(0, 1, 0))

  // helpers
  const calculatePosition = (
    locationOnCurve: number,
    side: number // 1 for left side, -1 for right side
  ) => {
    const position = curve.current.getPointAt(locationOnCurve)
    position.add(tempVector.current.set(0, objectVerticalOffset.current, 0))

    // get normal to curve
    const tangent = curve.current.getTangentAt(locationOnCurve)
    const normal = tempVector.current
      .copy(tangent)
      .applyAxisAngle(verticalUnitVector.current, Math.PI * 0.5)
      .normalize()
    position.add(normal.multiplyScalar(side * objectNormalMultiplier.current))

    return position
  }

  const calculateFocusProjectCameraData = (location: number) => {
    const cameraLocation = props.isPortrait
      ? location - 0.008
      : location - 0.005

    const cameraPosition = calculatePosition(cameraLocation, 0)
    const cameraLookAt = calculatePosition(location, 0)

    return [cameraPosition, cameraLookAt]
  }

  const updateMeshLookAtLocation = (
    projectLocation: number,
    projectIndex: number
  ) => {
    const newMeshLookAtPosition = props.isPortrait ? -0.008 : -0.005
    const lookAtPosition = calculatePosition(
      projectLocation + newMeshLookAtPosition,
      1
    )

    meshRefs.current[projectIndex]?.lookAt(lookAtPosition)
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

  // - dynamic size
  useEffect(() => {
    // BUG: curve.getPointAt(...) undefined if resizing is too fast
    // calculate new position if a project is focused
    if (currentProject.current !== null) {
      const [cameraPosition, cameraLookAt] = calculateFocusProjectCameraData(
        currentProjectLocation.current
      )

      // calculate mesh new lookAt position
      updateMeshLookAtLocation(
        currentProjectLocation.current,
        currentProjectIndex.current
      )

      // handler
      props.handleNewLocation({
        position: cameraPosition,
        lookAt: cameraLookAt,
      })
    }
  }, [props.isPortrait])

  // update focused project
  useEffect(() => {
    if (props.currentProject === null) {
      setCloseProjectIndex(currentProjectIndex.current)
    }

    currentProject.current = props.currentProject
  }, [props.currentProject])

  // handlers
  const handleProjectClick = (
    project: ProjectType,
    location: number,
    index: number
  ) => {
    const [cameraPosition, cameraLookAt] =
      calculateFocusProjectCameraData(location)

    // calculate mesh new lookAt position
    updateMeshLookAtLocation(location, index)

    // handler
    props.projectClicked(project, cameraPosition, cameraLookAt)

    // update states
    currentProjectLocation.current = location
    currentProject.current = project
    currentProjectIndex.current = index
    setCloseProjectIndex(-1)
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
          <Project
            key={project.name + i.toString()}
            geometry={projectGeometry.current}
            imageURL={project.images[0]}
            position={position}
            closeProject={closeProjectIndex === i}
            handleProjectClick={() => {
              handleProjectClick(project, normalisedLocation, i)
            }}
            handleRef={(ref) => {
              meshRefs.current[i] = ref
            }}
          />
        )
      })}
    </group>
  )
}

export default Projects
