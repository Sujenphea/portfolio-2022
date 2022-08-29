import { css, keyframes } from '@emotion/react'

const LoadingPage = () => {
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
      width: 100vw;
      height: 100vh;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      z-index: 5;
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
      animation: ${animations.fadeIn} 1s ease-in forwards,
        ${animations.nameShrink} 0.8s ease-out 1s forwards,
        ${animations.nameMoveUpFadeOut} 1s 4s forwards,
        ${animations.fadeOut} 0.1s 5s forwards;
    `,
    descriptionContainerStyle: css`
      position: absolute;
      top: calc(55vh + 3vw);
      transform: translateY(-50%);

      overflow: hidden;
    `,
    descriptionStyle: css`
      font-weight: 400;

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
