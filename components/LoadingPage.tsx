import { useEffect, useState } from 'react'

import { css, keyframes } from '@emotion/react'

type Props = {
  visible: boolean
}

const LoadingPage = (props: Props) => {
  // states
  // - purpose: remove from view after header appears (name doesn't fade out)
  const [visible, setVisible] = useState(true)

  // hooks
  useEffect(() => {
    if (props.visible === false) {
      setTimeout(() => {
        setVisible(false)
      }, 1000)
    }
  }, [props.visible])

  // styles + animations
  const animations = {
    nameShrink: keyframes`
      to {
        letter-spacing: normal;
      }
    `,
    nameMoveUpFadeOut: keyframes`
      from { 
        font-size: calc(100% + 2vw + 2vh);
      }

      to {
        color: white;
        top: clamp(0px, 50px, calc(2.5vh + 2.5vw));
        font-size: calc(70% + 0.9vw + 0.9vh);
      }
    `,
    fadeIn: keyframes`
      to {
        opacity: 100%;
      }
    `,
    fadeUp: keyframes`
      to {
        transform: translateY(0);
      }
    `,
    fadeOut: keyframes`
      from {
        opacity: 100%;
      }

      to {
        opacity: 0%;
        display: none;
      }
    `,
  }

  const styles = {
    containerStyle: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;

      display: ${visible ? `flex` : `none`};
      flex-direction: column;
      justify-content: center;
      align-items: center;

      color: rgb(70, 70, 70);
    `,
    nameStyle: css`
      position: absolute;
      top: 50vh;
      transform: translateY(-50%);

      opacity: 0;

      font-family: SourceSansPro;
      font-weight: 400;
      font-size: calc(100% + 2vw + 2vh);

      text-align: center;
      text-transform: uppercase;
      letter-spacing: calc(5vw);

      // animation
      animation: ${animations.fadeIn} 0.5s ease-in forwards,
        ${animations.nameShrink} 0.8s ease-out 1.5s forwards,
        ${animations.nameMoveUpFadeOut} 1s 4s forwards;
    `,
    descriptionContainerStyle: css`
      position: absolute;
      top: calc(55vh + 3vw);
      transform: translateY(-50%);

      overflow: hidden;
    `,
    descriptionStyle: css`
      font-weight: 400;
      font-size: calc(50% + 0.7vw + 0.7vh);

      transform: translateY(100%);

      // animation
      animation: ${animations.fadeUp} 1s 1.8s forwards,
        ${animations.fadeOut} 1s 4s forwards;
    `,
  }

  return (
    <div css={styles.containerStyle}>
      <div css={styles.nameStyle}>Sujen Phea</div>
      <div css={styles.descriptionContainerStyle}>
        <div css={styles.descriptionStyle}>Web Developer. iOS Developer.</div>
      </div>
    </div>
  )
}

export default LoadingPage
