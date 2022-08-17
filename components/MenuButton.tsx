import { CSSProperties, useRef } from 'react'
import { css } from '@emotion/react'

const MenuButton = (props: {
  menuVisible: boolean
  toggleMenu: () => void
  style: CSSProperties
  primaryColor: string
  secondaryColor: string
}) => {
  // params
  const height = useRef(props.style.height)

  // refs
  const buttonRef = useRef<HTMLButtonElement>(null!)

  // handlers
  const handleButtonClicked = () => {
    props.toggleMenu()
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
      & button.button-active div:nth-of-type(1) {
        transform: translate(0, calc(${height.current} * 0.48)) rotate(135deg);
      }

      & button.button-active div:nth-of-type(2) {
        transform: translate(0, calc(${height.current} * 0.24)) rotate(-45deg);
      }

      & button.button-active div:nth-of-type(3) {
        transform: scale(0, 1);
      }

      & button.button-active div:nth-of-type(4) {
        transform: translate(0, calc(-${height.current} * 0.24)) rotate(45deg);
      }

      & button.button-active div:nth-of-type(5) {
        transform: translate(0, calc(-${height.current} * 0.48)) rotate(-135deg);
      }

      // hover active state
      & button.button-active:hover div:nth-of-type(1) {
        background-color: ${props.secondaryColor};
        transform: translate(0, calc(${height.current} * 0.48)) rotate(180deg)
          scale(0.6, 1);
      }

      & button.button-active:hover div:nth-of-type(2) {
        transform: translate(0, calc(${height.current} * 0.24)) rotate(225deg)
          scale(1.2, 1);
      }

      & button.button-active:hover div:nth-of-type(4) {
        background-color: ${props.secondaryColor};
        transform: translate(0, calc(-${height.current} * 0.24)) rotate(90deg)
          scale(0.6, 1);
      }

      & button.button-active:hover div:nth-of-type(5) {
        transform: translate(0, calc(-${height.current} * 0.48)) rotate(135deg)
          scale(1.2, 1);
      }
    `,
    buttonStyle: css`
      width: 100%;
      height: 100%;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      color: white;
      background-color: transparent;
      outline: none;
      border: none;
      padding: 0;
      margin: 0;

      transition: all 0.25s;

      // shrink div on hover
      &:hover div:nth-of-type(1),
      &:hover div:nth-of-type(5) {
        transform: scale(0.9, 1);
      }

      &:hover div:nth-of-type(2),
      &:hover div:nth-of-type(4) {
        transform: scale(0.25, 1);
      }

      &:hover div:nth-of-type(3) {
        transform: scale(0.5, 1);
      }
    `,

    buttonDivStyle: css`
      display: block;
      width: 100%;
      height: 8%;
      max-height: 5px;

      background-color: ${props.primaryColor};
      border-radius: 3px;

      transition: all 0.25s;
    `,
  }

  return (
    <div
      style={{
        ...props.style,
        zIndex: 3,
      }}
    >
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
          <div css={styles.buttonDivStyle} />
          <div css={styles.buttonDivStyle} />
          <div css={styles.buttonDivStyle} />
          <div css={styles.buttonDivStyle} />
          <div css={styles.buttonDivStyle} />
        </button>
      </div>
    </div>
  )
}

export default MenuButton

MenuButton.defaultProps = {
  style: {
    position: 'absolute',
    right: '15px',
    top: '10px',
    height: '5vh',
    aspectRatio: 1,
  },
  menuVisible: false,
  toggleMenu: () => {},
  primaryColor: '#fff',
  secondaryColor: '#555',
}
