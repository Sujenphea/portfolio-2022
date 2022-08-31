import { css, SerializedStyles } from '@emotion/react'

type Props = {
  styles: SerializedStyles
  mobileOverlayEnabled: boolean
  handleMobileOverlaySwitchToGlanceView: () => void
}

const MobilePromptOverlay = (props: Props) => {
  const styles = {
    containerStyle: css`
      display: ${props.mobileOverlayEnabled ? `flex` : `none`};
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
    textStyle: css`
      width: 80vw;
    `,
    buttonStyle: css`
      margin: 0;
      min-height: 60px;
      min-width: 0;
      outline: none;
      padding: 16px 24px;

      appearance: none;
      color: inherit;
      background-color: transparent;
      border: 1.5px solid #fff;
      border-radius: 15px;

      box-sizing: border-box;
      cursor: pointer;

      font-size: 16px;
      font-weight: 600;
      line-height: normal;
      text-align: center;
      text-decoration: none;

      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      will-change: transform;

      transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

      &:disabled {
        pointer-events: none;
      }

      &:hover {
        background-color: rgb(173, 182, 255);
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px);
      }

      &:active {
        box-shadow: none;
        transform: translateY(0);
      }
    `,
  }

  return (
    <div css={[styles.containerStyle, props.styles]}>
      <h1 css={styles.textStyle}>
        For optimal experiences, please rotate your device
      </h1>
      <button
        css={styles.buttonStyle}
        type="button"
        onClick={() => {
          props.handleMobileOverlaySwitchToGlanceView()
        }}
      >
        continue with sub-optimal experiences
      </button>
    </div>
  )
}

export default MobilePromptOverlay
