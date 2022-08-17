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
  const [menuVisible, setMenuVisible] = useState(false)
  const [glanceViewVisible, setGlanceViewVisible] = useState(false)
  // - show mobile overlay initially, and if in canvas or project immersive overlay
  const [mobileOverlayVisible, setMobileOverlayVisible] = useState(true)

  // - assumptions
  // -- FirstPerson: immersive
  // -- Overview: glance, menu
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
    setMenuVisible(!menuVisible)
  }

  const handleCameraViewChange = (cameraView: CameraViewType) => {
    setCameraView(cameraView)

    // show mobile overlay again if size changes
    if (
      cameraView === CameraViewType.FirstPerson ||
      cameraView === CameraViewType.Project
    ) {
      setMobileOverlayVisible(true)
    }
  }

  // - project overlay (immersive and glance)
  const handleCloseProjectOverlay = () => {
    // if immersive view
    if (cameraView === CameraViewType.Project) {
      handleCameraViewChange(CameraViewType.FirstPerson)
    }
    // if glance view
    else {
      setGlanceViewVisible(true)
    }

    // reset overlay project so useEffect is called if same project clicked again
    setCurrentOverlayProject(null!)
  }

  const handleProjectOverlayChange = (project: ProjectType) => {
    setCurrentOverlayProject(project)
  }

  // - glance view open project
  const handleOpenGlanceViewProjectDetails = (project: ProjectType) => {
    setGlanceViewVisible(false)
    handleProjectOverlayChange(project)
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

    setGlanceViewVisible(isGlanceView)
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
          display: ${mobileOverlayVisible ? `flex` : `none`};
          flex-direction: column;
          justify-content: center;
          align-items: center;

          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: black;
          z-index: 4;

          color: white;
          text-align: center;

          @media (min-width: 768px) {
            display: none;
          }
        `}
      >
        <h1>For optimal experiences, please rotate your device</h1>
        <button
          type="button"
          onClick={() => {
            handleCloseProjectOverlay()
            setGlanceViewVisible(true)
            console.log('dbg - change camera view to overview')

            setCameraView(CameraViewType.Overview)
            setMobileOverlayVisible(false)
          }}
        >
          continue with sub-optimal experiences
        </button>
        <Image
          src="/temp-rotate-phone.gif"
          alt="my gif"
          height={500}
          width={500}
        />
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
        <ExperienceCanvas
          cameraView={cameraView}
          changeCameraView={handleCameraViewChange}
          changeProjectOverlay={handleProjectOverlayChange}
          isPortrait={isPortrait}
        />
      </div>
      <MenuButton menuVisible={menuVisible} toggleMenu={handleToggleMenu} />
      <Menu visible={menuVisible} toggleView={handleToggleView} />
      <GlanceView
        visible={glanceViewVisible}
        handleProjectClicked={handleOpenGlanceViewProjectDetails}
      />
      <ProjectImmersiveOverlay
        project={currentOverlayProject}
        visible={currentOverlayProject !== null}
        closeProjectOverlay={handleCloseProjectOverlay}
        isPortrait={isPortrait}
      />
      <ContactBar
        style={{ position: 'absolute', bottom: '15px', left: '15px' }}
      />
    </div>
  )
}
