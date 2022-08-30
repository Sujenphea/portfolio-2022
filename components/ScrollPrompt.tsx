import { css, keyframes } from '@emotion/react'

const ScrollPrompt = () => {
  const animations = {
    fadeIn: keyframes`
      to {
        opacity: 0.6;
      }
    `,
    fadeOut: keyframes`
      to {
        opacity: 0;
      }
    `,
  }

  const styles = {
    containerStyle: css`
      position: absolute;
      top: 45vh;
      left: 50%;
      transform: translate(-50%);

      z-index: 1;

      color: #ffffff;
      opacity: 0;
      font-size: calc(1vw + 2.5vh);
      text-transform: uppercase;

      animation: ${animations.fadeIn} 1s linear 5s forwards,
        ${animations.fadeOut} 0.5s linear 7s forwards;
    `,
  }

  return <div css={styles.containerStyle}>scroll</div>
}

export default ScrollPrompt
