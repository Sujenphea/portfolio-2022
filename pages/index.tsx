import { CSSProperties, useEffect, useState } from 'react'
import Image from 'next/image'

import { css } from '@emotion/react'

import CameraViewType from '../types/cameraViewType'
import ProjectViewType from '../types/projectViewType'

import Header from '../components/Header'

import LoadingPage from '../components/LoadingPage'

import Menu from '../components/Menu'

import GlanceView from '../components/GlanceView'

import ExperienceCanvas from '../experience/ExperienceCanvas'

import ContactBar from '../components/ContactBar'

import ProjectImmersiveOverlay from '../components/ProjectImmersiveOverlay'
import ProjectType from '../types/projectType'

export default function Home() {
  // states
  // - overlays
  const [menuVisible, setMenuVisible] = useState(false)
  const [glanceViewVisible, setGlanceViewVisible] = useState(false) // enable hiding when project overlay is showing
  const [mobileOverlayEnabled, setMobileOverlayEnabled] = useState(true) // enable overlay initially + change to immersive view
  const [currentProjectOverlay, setCurrentProjectOverlay] =
    useState<ProjectType>(null!)

  const [projectView, setProjectView] = useState(ProjectViewType.Immersive)
  const [cameraView, setCameraView] = useState(CameraViewType.FirstPerson)
  const [isPortrait, setIsPortrait] = useState<boolean>(false)

  // hooks
  // - initial
  useEffect(() => {
    document.title = 'blackmatter'

    // update screen orientation
    function updateScreenOrientation() {
      setIsPortrait(window.innerWidth / window.innerHeight < 1.3)
    }

    window.addEventListener('resize', updateScreenOrientation)
    updateScreenOrientation()

    return () => {
      window.removeEventListener('resize', updateScreenOrientation)
    }
  }, [])

  // - change in project view changes camera view
  useEffect(() => {
    setCurrentProjectOverlay(null!)

    switch (projectView) {
      case ProjectViewType.Immersive:
        setCameraView(CameraViewType.FirstPerson)
        setGlanceViewVisible(false)
        setMobileOverlayEnabled(true)
        return

      case ProjectViewType.Glance:
        setCameraView(CameraViewType.Overview)
        setGlanceViewVisible(true)
        setMobileOverlayEnabled(false)
        return
    }
  }, [projectView])

  // handlers
  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  // - toggle between boolean (immersive, glance)
  const handleToggleView = (toGlanceView: boolean) => {
    if (toGlanceView) {
      setProjectView(ProjectViewType.Glance)
    } else {
      setProjectView(ProjectViewType.Immersive)
    }
  }

  const handleMobileOverlaySwitchToGlanceView = () => {
    setProjectView(ProjectViewType.Glance)
  }

  // - glance view open project
  const handleOpenGlanceViewProjectOverlay = (project: ProjectType) => {
    handleChangeProjectOverlay(project)
    setGlanceViewVisible(false)
  }

  const handleOpenImmersiveViewProjectOverlay = (
    project: ProjectType,
    cameraView: CameraViewType
  ) => {
    handleChangeProjectOverlay(project)
    setCameraView(cameraView)
  }

  const handleChangeProjectOverlay = (project: ProjectType) => {
    setCurrentProjectOverlay(project)
  }

  // - project overlay (immersive and glance)
  const handleCloseProjectOverlay = () => {
    // if immersive view
    if (cameraView === CameraViewType.Project) {
      setCameraView(CameraViewType.FirstPerson)
    }

    // if glance view
    else {
      setGlanceViewVisible(true)
    }

    // reset overlay project so useEffect is called if same project clicked again
    setCurrentProjectOverlay(null!)
  }

  // styles
  const styles = {
    containerStyle: css`
      width: 100vw;
      height: 100vh;
    `,
    mobileContainerStyle: css`
      display: ${mobileOverlayEnabled ? `flex` : `none`};
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
    `,
    nonMobileContainerStyle: css`
      display: none;

      @media (min-width: 768px) {
        display: block;
      }
    `,
    contactBarStyle: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
    } as CSSProperties,
  }

  const theme = {
    backgroundColor: css`
      background: ${projectView === 0
        ? `linear-gradient(45deg, rgb(211, 239, 255) 0%, rgb(107, 93, 255) 100%)`
        : `linear-gradient(45deg, rgb(54, 61, 65) 0%, rgb(8, 3, 55) 100%)`};
    `,
    menu: css`
      color: ${projectView === 0 ? `rgb(203, 182, 255)` : `white`};
      backdrop-filter: blur(5px) brightness(65%);
    `,
    project: css`
      backdrop-filter: blur(3px) brightness(80%);
    `,
  }

  return (
    <div css={[styles.containerStyle, theme.backgroundColor]}>
      {/* <LoadingPage /> */}
      {/* mobile */}
      <div css={styles.mobileContainerStyle}>
        <h1>For optimal experiences, please rotate your device</h1>
        <button
          type="button"
          onClick={() => {
            handleMobileOverlaySwitchToGlanceView()
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
      <div css={styles.nonMobileContainerStyle}>
        <ExperienceCanvas
          cameraView={cameraView}
          handleProjectClicked={handleOpenImmersiveViewProjectOverlay}
          isPortrait={isPortrait}
          currentProject={currentProjectOverlay}
        />
      </div>
      <Header menuVisible={menuVisible} toggleMenu={handleToggleMenu} />
      <Menu
        styles={theme.menu}
        visible={menuVisible}
        toggleView={handleToggleView}
        projectView={projectView}
      />
      <GlanceView
        visible={glanceViewVisible}
        handleProjectClicked={handleOpenGlanceViewProjectOverlay}
      />
      <ProjectImmersiveOverlay
        styles={theme.project}
        project={currentProjectOverlay}
        visible={currentProjectOverlay !== null}
        closeProjectOverlay={handleCloseProjectOverlay}
        isPortrait={isPortrait}
      />
      <ContactBar style={styles.contactBarStyle} />
    </div>
  )
}
