import { css } from '@emotion/react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import AnimateHandle from '../types/animateHandlerType'
import ProjectType from '../types/projectType'

type Props = {
  project: ProjectType
  closeProjectOverlay: () => void
  visible: boolean
  isPortrait: boolean
}

const ProjectImmersiveOverlay = forwardRef<AnimateHandle, Props>(
  (props, forwardedRef) => {
    // params
    const imageMarginLeft = useRef('5vh')

    // states
    // - makes sure project is not null
    const [currentProject, setCurrentProject] = useState<ProjectType>({
      name: '',
      company: '',
      description: '',
      technologies: [],
      year: 2000,
      link: '',
      images: [],
    })
    const [scrollTransformX, setScrollTransformX] = useState(0)

    // refs
    const containerRef = useRef<HTMLDivElement>(null!)
    const imageContainerRef = useRef<HTMLDivElement>(null!)
    const isPortraitRef = useRef(false) // purpose: so animation frame can get latest data
    const currX = useRef(0)
    const currentTimeout: { current: NodeJS.Timeout | null } = useRef(null)

    // animation frame
    // - update image scroll
    const animate = () => {
      // get translation based on scroll
      const targetX = containerRef.current.getBoundingClientRect().top
      currX.current += (targetX - currX.current) * 0.15
      const translateX = -currX.current.toFixed(4)

      // update translation
      setScrollTransformX(translateX)
    }

    // handle render animation frame
    useImperativeHandle(forwardedRef, () => ({
      animate() {
        animate()
      },
    }))

    // hooks
    useEffect(() => {
      // two cases:
      // - if set project when null -> animation not smooth
      // - scroll needs images array to be null -> reset scrolling

      if (props.project !== null) {
        setCurrentProject(props.project)

        // stop timeout to reset scroll (just in case)
        clearTimeout(currentTimeout.current as NodeJS.Timeout)
      } else {
        // set timeout to reset scroll
        currentTimeout.current = setTimeout(() => {
          setCurrentProject({ ...currentProject, images: [] })
        }, 300)
      }
    }, [props.project])

    useEffect(() => {
      isPortraitRef.current = props.isPortrait
    }, [props.isPortrait])

    // styles
    const animations = {
      normalAnimation: css`
        opacity: ${props.visible ? 1 : 0};
        transition: visibility 0.2s, opacity 0.2s linear;
      `,
      delayedImageContainerAnimation: css`
        opacity: ${props.visible ? 1 : 0};
        transition: visibility 0.2s, opacity 0.2s;
      `,
    }
    const styles = {
      sectionStyle: css`
        display: block;
        visibility: ${props.visible ? `visible` : `hidden`};
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        overflow: auto;

        color: white;
      `,
      containerStyle: css`
        @media (min-width: 768px) {
          height: calc(
            100vh + ${currentProject.images.length - 1} *
              (
                ${props.isPortrait ? `32vh` : `51.2vh`} +
                  ${imageMarginLeft.current}
              )
          );
        }
      `,
      modalStyle: css`
        position: sticky;
        top: 0;
        width: 100vw;

        background-color: rgba(40, 40, 40, 0.5);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        overflow: hidden;

        @media (min-width: 768px) {
          height: 100vh;
          flex-direction: row;
        }
      `,
      imageContainerStyle: css`
        display: flex;
        flex-direction: column;
        justify-content: right;
        flex-wrap: nowrap;

        ${animations.delayedImageContainerAnimation}

        @media (min-width: 768px) {
          position: absolute;
          width: calc(${props.isPortrait ? `32vh` : `51.2vh`});
          height: calc(${props.isPortrait ? `24vh` : `38vh`});

          flex-direction: row;

          transform: translateX(
            calc(
              ${scrollTransformX}px + ${props.isPortrait ? `-21vh` : `-33.7vh`}
            )
          );
        }
      `,
      imageStyle: css`
        height: 40vh;
        padding-top: 20px;
        padding-bottom: 20px;

        filter: brightness(70%);

        @media (min-width: 768px) {
          width: 100%;
          height: 100%;

          padding-top: 0px;
          padding-bottom: 0px;
          margin-left: ${imageMarginLeft.current};
          flex: 0 0 auto;
        }
      `,
      titleStyle: css`
        max-width: 200px;

        text-transform: uppercase;
        font-weight: 600;
        font-size: 38px;
        font-size: calc(50% + ${props.isPortrait ? `3vh` : `4vh`});

        margin-top: 5vh;
        margin-bottom: 5vh;

        ${animations.normalAnimation}

        @media (min-width: 768px) {
          position: absolute;

          z-index: 2;

          transform: translate(
            calc(${props.isPortrait ? `-35vh` : `-50vh`}),
            0
          );
        }
      `,
      descriptionStyle: css`
        display: flex;
        flex-direction: column;
        max-width: 80vw;

        font-family: SourceSansPro;
        font-weight: 300;
        font-size: 20px;
        font-size: calc(${props.isPortrait ? `40%` : `40%`} + 0.9vh + 0.5vw);

        ${animations.normalAnimation}

        @media (min-width: 768px) {
          max-width: 40vw;
          position: absolute;
          left: 50vw;

          transform: translate(2vw, 0);
        }
      `,
      closeButtonStyle: css`
        position: absolute;
        top: calc(20px + 5vh + 5vw);

        color: white;
        background-color: transparent;
        border: none;
      `,
    }

    return (
      <section css={styles.sectionStyle}>
        <div css={styles.containerStyle} ref={containerRef}>
          <div css={styles.modalStyle}>
            {/* title */}
            <div css={styles.titleStyle}>{currentProject.name}</div>

            {/* description */}
            <div css={styles.descriptionStyle}>
              <div>year: {currentProject.year}</div>
              <div>technologies: {currentProject.technologies}</div>
              <div>{currentProject.description}</div>
            </div>

            <div css={styles.imageContainerStyle} ref={imageContainerRef}>
              {currentProject.images.map((link, i) => {
                return (
                  <img
                    key={link + i}
                    css={styles.imageStyle}
                    src={link}
                    alt="project image"
                  />
                )
              })}
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
)

export default ProjectImmersiveOverlay
