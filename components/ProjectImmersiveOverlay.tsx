import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

import ProjectType from '../types/projectType'

const ProjectImmersiveOverlay = (props: {
  project: ProjectType
  closeProjectOverlay: () => void
  isPortrait: boolean
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
  // take orientation when project is clicked, don't update orientation otherwise
  const currentIsPortrait = useRef(false)

  useEffect(() => {
    if (props.project !== null) {
      currentIsPortrait.current = props.isPortrait
      setCurrentProject(props.project)
      setOverlayVisible(true)
    }
  }, [props.project])

  // styles
  const styles = {
    containerStyle: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;

      display: ${overlayVisible ? `flex` : `none`};
      flex-direction: row;
      justify-content: center;
      align-items: center;

      color: white;
      zindex: 1;
    `,
    imageContainerStyle: css`
      position: absolute;
      aspect-ratio: 12/9;
      height: calc(${currentIsPortrait.current ? `20%` : `32%`});

      transform: translate(
        calc(${currentIsPortrait.current ? `-22vh` : `-35vh`}),
        0
      );
    `,
    imageStyle: css`
      width: 100%;
      height: 100%;

      filter: brightness(70%);
      opacity: 0.5;
    `,
    titleStyle: css`
      position: absolute;
      max-width: 200px;

      text-transform: uppercase;
      font-size: 20px;
      font-size: calc(50% + ${currentIsPortrait.current ? `3vh` : `4vh`});
      transform: translate(
        calc(${currentIsPortrait.current ? `-35vh` : `-50vh`}),
        0
      );
    `,
    descriptionStyle: css`
      display: flex;
      flex-direction: column;
      max-width: 40vw;

      font-size: 20px;
      font-size: calc(${currentIsPortrait.current ? `40%` : `70%`} + 2vh);

      transform: translate(
        calc(${currentIsPortrait.current ? `22vh` : `35vh`} + 2vw),
        0
      );
    `,
    closeButtonStyle: css`
      position: absolute;
      top: 50px;
      right: 30px;

      color: white;
      background-color: transparent;
      border: none;
    `,
  }

  return (
    <div css={styles.containerStyle}>
      {/* image */}
      <div css={styles.imageContainerStyle}>
        <img
          css={styles.imageStyle}
          src={'./testImage.png'}
          alt="sample image"
        />
      </div>

      {/* title */}
      <div css={styles.titleStyle}>{currentProject.name}</div>

      {/* description */}
      <div css={styles.descriptionStyle}>
        <div>year: {currentProject.year}</div>
        <div>technologies: {currentProject.technologies}</div>
        <div>{currentProject.description}</div>
      </div>

      {/* close button */}
      <button
        css={styles.closeButtonStyle}
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
