import { css, keyframes } from '@emotion/react'

const LoadingPage = () => {
  const animations = {
    nameShrink: keyframes`
      to {
        letter-spacing: normal;
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
      opacity: 0;

      font-family: SourceSansPro;
      font-weight: 800;
      font-size: calc(100% + 2vw + 2vh);

      text-align: center;
      letter-spacing: calc(5vw);
      text-transform: uppercase;

      // animation
      animation: ${animations.fadeIn} 1s ease-in forwards,
        ${animations.nameShrink} 0.8s ease-out 1s forwards;
    `,
    descriptionContainerStyle: css`
      overflow: hidden;
    `,
    descriptionStyle: css`
      font-weight: 400;

      transform: translateY(100%);

      // animation
      animation: ${animations.fadeUp} 1s 1.8s forwards;
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
