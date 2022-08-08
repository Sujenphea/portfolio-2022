import { useEffect, useState } from 'react'
import CameraViewType from '../types/cameraViewEnum'

import Menu from '../components/Menu'
import MenuButton from '../components/MenuButton'

import GlanceView from '../components/GlanceView'

import ExperienceCanvas from '../experience/ExperienceCanvas'

import ContactBar from '../components/ContactBar'

import ProjectImmersiveOverlay from '../components/ProjectImmersiveOverlay'
import ProjectType from '../types/projectType'

export default function Home() {
  // states
  const [menuVisible, SetMenuVisible] = useState(false)
  const [glanceViewVisible, SetGlanceViewVisible] = useState(false)
  const [cameraView, setCameraView] = useState(CameraViewType.FirstPerson)
  const [currentOverlayProject, setCurrentOverlayProject] =
    useState<ProjectType>(null!)

  // hooks
  useEffect(() => {
    document.title = 'blackmatter'
  })

  // handlers
  const handleToggleMenu = () => {
    SetMenuVisible(!menuVisible)
  }

  const handleCameraViewChange = (cameraView: CameraViewType) => {
    setCameraView(cameraView)
  }

  // immersive view project overlay
  const handleCloseProjectOverlay = () => {
    handleCameraViewChange(CameraViewType.FirstPerson)

    // reset overlay project so useEffect is called if same project clicked again
    setCurrentOverlayProject(null!)
  }

  const handleProjectOverlayChange = (project: ProjectType) => {
    setCurrentOverlayProject(project)
  }

  return (
    <div
      style={{
        backgroundColor: 'rgb(6, 10, 17)',
      }}
    >
      <MenuButton visible={menuVisible} handleToggleMenu={handleToggleMenu} />
      <Menu visible={menuVisible} />
      <ExperienceCanvas
        cameraView={cameraView}
        changeCameraView={handleCameraViewChange}
        changeProjectOverlay={handleProjectOverlayChange}
      />
      <GlanceView visible={glanceViewVisible} />
      <ProjectImmersiveOverlay
        project={currentOverlayProject}
        closeProjectOverlay={handleCloseProjectOverlay}
      />
      <ContactBar
        style={{ position: 'absolute', bottom: '15px', left: '15px' }}
      />
    </div>
  )
}
