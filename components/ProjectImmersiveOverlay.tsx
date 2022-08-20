import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

import ProjectType from '../types/projectType'

const ProjectImmersiveOverlay = (props: {
  project: ProjectType
  closeProjectOverlay: () => void
  visible: boolean
  isPortrait: boolean
}) => {
  // states
  // - makes sure project is not null
  const [currentProject, setCurrentProject] = useState<ProjectType>({
    name: '',
    company: '',
    description: '',
    technologies: [],
    year: 2000,
    link: '',
  })

  // refs
  const containerRef = useRef<HTMLDivElement>(null!)
  const imageContainerRef = useRef<HTMLDivElement>(null!)
  const requestRef = useRef(0) // animation frame
  const isPortraitRef = useRef(false) // purpose: so animation frame can get latest data
  var currX = 0

  // animation frame
  // - update image scroll
  const animate = () => {
    // get translation based on scroll
    const targetX = containerRef.current.getBoundingClientRect().top
    currX += (targetX - currX) * 0.15
    const translateX = -currX.toFixed(4)

    // update translation
    imageContainerRef.current.style.transform = `translateX(calc(${translateX}px + ${
      isPortraitRef.current ? `-20.5vh` : `-33vh`
    }))`

    // call next frame
    requestRef.current = requestAnimationFrame(animate)
  }

  // hooks
  // - call animation frame
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, []) // Make sure the effect runs only once

  useEffect(() => {
    if (props.project !== null) {
      setCurrentProject(props.project)
    }
  }, [props.project])

  useEffect(() => {
    isPortraitRef.current = props.isPortrait
  }, [props.isPortrait])

  // styles
  const styles = {
    sectionStyle: css`
      display: ${props.visible ? `block` : `none`};
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;

      overflow: auto;

      color: white;
    `,
    containerStyle: css`
      height: calc(100vh * 2);
    `,
    modalStyle: css`
      position: sticky;
      top: 0;
      width: 100vw;
      height: 100vh;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      overflow: hidden;
    `,

    imageContainerStyle: css`
      position: absolute;
      aspect-ratio: 12/9;
      height: calc(${props.isPortrait ? `23.5%` : `38.5%`});

      display: flex;
      flex-direction: row;
      justify-content: right;
      flex-wrap: nowrap;
    `,
    imageStyle: css`
      width: 100%;
      height: 100%;
      flex: 0 0 auto;

      filter: brightness(70%);
      opacity: 0.5;
      margin-left: 20px;
    `,
    titleStyle: css`
      position: absolute;
      max-width: 200px;

      text-transform: uppercase;
      font-size: 20px;
      font-size: calc(50% + ${props.isPortrait ? `3vh` : `4vh`});
      transform: translate(calc(${props.isPortrait ? `-35vh` : `-50vh`}), 0);
    `,
    descriptionStyle: css`
      display: flex;
      flex-direction: column;
      max-width: 40vw;

      font-size: 20px;
      font-size: calc(${props.isPortrait ? `40%` : `70%`} + 2vh);

      transform: translate(
        calc(${props.isPortrait ? `20.5vh` : `33vh`} + 2vw),
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
    <section css={styles.sectionStyle}>
      <div css={styles.containerStyle} ref={containerRef}>
        <div css={styles.modalStyle}>
          <div css={styles.imageContainerStyle} ref={imageContainerRef}>
            <img
              css={styles.imageStyle}
              src={'./testImage.png'}
              alt="sample image"
            />
            <img
              css={styles.imageStyle}
              src={'./testImage.png'}
              alt="sample image"
            />
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
              props.closeProjectOverlay()
            }}
          >
            close project
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProjectImmersiveOverlay
