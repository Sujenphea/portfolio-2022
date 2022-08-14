import { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'

import { css } from '@emotion/react'

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
  const [isPortrait, setIsPortrait] = useState<boolean>(false)

  // hooks
  useEffect(() => {
    document.title = 'blackmatter'
  }, [])

  // - manage screen orientation
  useEffect(() => {
    function updateScreenOrientation() {
      setIsPortrait(window.innerWidth / window.innerHeight < 1.2)
    }

    window.addEventListener('resize', updateScreenOrientation)
    updateScreenOrientation()

    return () => {
      window.removeEventListener('resize', updateScreenOrientation)
    }
  }, [])

  // handlers
  const handleToggleMenu = () => {
    SetMenuVisible(!menuVisible)
  }

  const handleCameraViewChange = (cameraView: CameraViewType) => {
    setCameraView(cameraView)
  }

  // - immersive view project overlay
  const handleCloseProjectOverlay = () => {
    handleCameraViewChange(CameraViewType.FirstPerson)

    // reset overlay project so useEffect is called if same project clicked again
    setCurrentOverlayProject(null!)
  }

  const handleProjectOverlayChange = (project: ProjectType) => {
    setCurrentOverlayProject(project)
  }

  // - toggle between views
  // -- two views: glance, immersive
  // -- currently stored as boolean
  const handleToggleView = (isGlanceView: boolean) => {
    if (isGlanceView) {
      handleCameraViewChange(CameraViewType.Overview)
    } else {
      handleCameraViewChange(CameraViewType.FirstPerson)
    }

    SetGlanceViewVisible(isGlanceView)
  }

  return (
    <div
      style={{
        backgroundColor: 'rgb(6, 10, 17)',

        width: '100vw',
        height: '100vh',
      }}
    >
      {/* mobile */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          height: 100vh;

          color: white;
          text-align: center;

          @media (min-width: 768px) {
            display: none;
          }
        `}
      >
        <h1>For optimal experiences, please rotate your device</h1>
        <Image
          src="/temp-rotate-phone.gif"
          alt="my gif"
          height={500}
          width={500}
        />
        {/* fix: needs to be handled */}
        {/* <button type="button">continue with sub-optimal experiences</button> */}
      </div>
      {/* non mobile */}
      <div
        css={css`
          display: none;

          @media (min-width: 768px) {
            display: block;
          }
        `}
      >
        <MenuButton menuVisible={menuVisible} toggleMenu={handleToggleMenu} />
        <Menu visible={menuVisible} toggleView={handleToggleView} />
        <ExperienceCanvas
          cameraView={cameraView}
          changeCameraView={handleCameraViewChange}
          changeProjectOverlay={handleProjectOverlayChange}
          isPortrait={isPortrait}
        />
        <GlanceView visible={glanceViewVisible} />
        <ProjectImmersiveOverlay
          project={currentOverlayProject}
          closeProjectOverlay={handleCloseProjectOverlay}
          isPortrait={isPortrait}
        />
        <ContactBar
          style={{ position: 'absolute', bottom: '15px', left: '15px' }}
        />
      </div>
    </div>
  )
}
