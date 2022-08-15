import { CSSProperties, useRef } from 'react'
import { css } from '@emotion/react'

const MenuButton = (props: {
  menuVisible: boolean
  toggleMenu: () => void
  style: CSSProperties
}) => {
  // params
  const height = useRef(props.style.height)

  // refs
  const buttonRef = useRef<HTMLButtonElement>(null!)

  // handlers
  const handleButtonClicked = () => {
    if (buttonRef.current.classList.contains('button-active')) {
      buttonRef.current.classList.remove('button-active')
    } else {
      buttonRef.current.classList.add('button-active')
    }
  }

  // styles
  const styles = {
    containerAnimationStyle: css`
      width: 100%;
      height: 100%;

      // active state
      & button.button-active span:nth-of-type(1) {
        transform: translate(0, calc(${height.current} * 0.5)) rotate(135deg)
          scale(1.1, 1);
      }

      & button.button-active span:nth-of-type(2) {
        transform: translate(0, calc(${height.current} * 0.2)) rotate(-45deg);
      }

      & button.button-active span:nth-of-type(3) {
        transform: scale(0, 1);
      }

      & button.button-active span:nth-of-type(4) {
        transform: translate(0, calc(-${height.current} * 0.2)) rotate(45deg)
          scale(1.1, 1);
      }

      & button.button-active span:nth-of-type(5) {
        transform: translate(0, calc(-${height.current} * 0.5)) rotate(-135deg);
      }

      // hover active state
      & button.button-active:hover span:nth-of-type(1) {
        transform: translate(0, calc(${height.current} * 0.6)) rotate(135deg)
          scale(0.7, 1);
      }

      & button.button-active:hover span:nth-of-type(2) {
        transform: translate(0, calc(${height.current} * 0.1)) rotate(-45deg);
      }

      & button.button-active:hover span:nth-of-type(4) {
        transform: translate(0, calc(-${height.current} * 0.1)) rotate(45deg)
          scale(0.7, 1);
      }

      & button.button-active:hover span:nth-of-type(5) {
        transform: translate(0, calc(-${height.current} * 0.6)) rotate(-135deg);
      }
    `,
    buttonStyle: css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      color: white;
      background-color: transparent;
      outline: none;
      border: none;

      transition: all 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);

      // shrink span on hover
      &:hover span:nth-of-type(1),
      &:hover span:nth-of-type(5) {
        transform: scale(0.9, 1);
      }

      &:hover span:nth-of-type(2),
      &:hover span:nth-of-type(4) {
        transform: scale(0.25, 1);
      }

      &:hover span:nth-of-type(3) {
        transform: scale(0.5, 1);
      }
    `,

    buttonSpanStyle: css`
      display: block;
      width: 100%;
      height: 2px;

      background-color: #fff;
      border-radius: 3px;

      transition: all 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
    `,
  }

  return (
    <div style={props.style}>
      <div css={styles.containerAnimationStyle}>
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            handleButtonClicked()
          }}
          css={styles.buttonStyle}
        >
          <span css={styles.buttonSpanStyle} />
          <span css={styles.buttonSpanStyle} />
          <span css={styles.buttonSpanStyle} />
          <span css={styles.buttonSpanStyle} />
          <span css={styles.buttonSpanStyle} />
        </button>
      </div>
    </div>
  )
}

export default MenuButton

MenuButton.defaultProps = {
  style: {
    position: 'absolute',
    right: '50vw',
    top: '50vh',
    width: '80px',
    height: '60px',
  },
}
