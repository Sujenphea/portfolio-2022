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
  // take orientation when project is clicked, don't update orientation otherwise
  const currentIsPortrait = useRef(false)

  // refs
  const containerRef = useRef<HTMLDivElement>(null!)
  const testRef = useRef<HTMLDivElement>(null!)
  const requestRef = useRef(0)
  var currX = 0

  // animation frame
  // - update image scroll
  const animate = () => {
    // get translation based on scroll
    const targetX = containerRef.current.getBoundingClientRect().top
    currX += (targetX - currX) * 0.15
    const translateX = -currX.toFixed(4)

    // update translation
    testRef.current.style.transform = `translateX(calc(${translateX}px + ${
      currentIsPortrait.current ? `-22vh` : `-35vh`
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
      currentIsPortrait.current = props.isPortrait
      setCurrentProject(props.project)
    }
  }, [props.project])

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
      aspect-ratio: 12/9;
      height: calc(${currentIsPortrait.current ? `20%` : `32%`});

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
    <section css={styles.sectionStyle}>
      <div css={styles.containerStyle} ref={containerRef}>
        <div css={styles.modalStyle}>
          <div css={styles.imageContainerStyle} ref={testRef}>
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
