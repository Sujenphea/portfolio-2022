import { useEffect, useState } from 'react'

import ProjectType from '../types/projectType'

const ProjectImmersiveOverlay = (props: {
  project: ProjectType
  closeProjectOverlay: () => void
}) => {
  // states
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [currentProject, setCurrentProject] = useState<ProjectType>({
    name: '',
    company: '',
    description: '',
    technologies: [],
    year: 2000,
    link: '',
  })

  useEffect(() => {
    if (props.project !== null) {
      setCurrentProject(props.project)
      setOverlayVisible(true)
    }
  }, [props.project])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',

        display: overlayVisible ? 'flex' : 'none',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        color: 'white',

        zIndex: 1,
      }}
    >
      {/* image */}
      <div>
        <img
          style={{
            width: '350px',
            height: '230px',

            filter: 'brightness(70%)',
          }}
          src={'./testImage.png'}
          alt="sample image"
        />
      </div>

      {/* title */}
      <div
        style={{
          position: 'absolute',
          top: '42vh',
          left: '10vw',
          maxWidth: '200px',

          fontSize: '30px',
        }}
      >
        {currentProject.name}
      </div>

      {/* description */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '40vw',

          fontSize: '24px',
        }}
      >
        <div>year: {currentProject.year}</div>
        <div>technologies: {currentProject.technologies}</div>
        <div>{currentProject.description}</div>
      </div>
      {/* close button */}
      <button
        style={{
          position: 'absolute',
          top: '50px',
          right: '30px',

          color: 'white',
        }}
        type="button"
        onClick={() => {
          setOverlayVisible(false)
          props.closeProjectOverlay()
        }}
      >
        close project
      </button>
    </div>
  )
}

export default ProjectImmersiveOverlay
