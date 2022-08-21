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
  const buttonRef = useRef<HTMLDivElement>(null!)

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
      & .button-active div:nth-of-type(1) {
        transform: translateY(calc(${height.current} * 0.5)) rotate(135deg);
      }

      & .button-active div:nth-of-type(2) {
        transform: translateY(calc(${height.current} * 0.5)) rotate(-45deg);
      }

      & .button-active div:nth-of-type(3) {
        transform: translateY(calc(${height.current} * 0.5)) scale(0, 1);
      }

      & .button-active div:nth-of-type(4) {
        transform: translateY(calc(${height.current} * 0.5)) rotate(45deg);
      }

      & .button-active div:nth-of-type(5) {
        transform: translateY(calc(${height.current} * 0.5)) rotate(-135deg);
      }

      // hover active state
      & .button-active:hover div:nth-of-type(1) {
        background-color: ${props.secondaryColor};
        transform: translateY(calc(${height.current} * 0.5)) rotate(180deg)
          scale(0.6, 1);
      }

      & .button-active:hover div:nth-of-type(2) {
        transform: translateY(calc(${height.current} * 0.5)) rotate(225deg)
          scale(1.2, 1);
      }

      & .button-active:hover div:nth-of-type(3) {
        transform: translateY(calc(${height.current} * 0.5)) scale(0, 1);
      }

      & .button-active:hover div:nth-of-type(4) {
        background-color: ${props.secondaryColor};
        transform: translateY(calc(${height.current} * 0.5)) rotate(90deg)
          scale(0.6, 1);
      }

      & .button-active:hover div:nth-of-type(5) {
        transform: translateY(calc(${height.current} * 0.5)) rotate(135deg)
          scale(1.2, 1);
      }
    `,
    buttonStyle: css`
      width: 100%;
      height: 100%;
      cursor: pointer;

      color: white;
      background-color: transparent;
      outline: none;
      border: none;
      padding: 0;
      margin: 0;

      transition: all 0.25s;

      // shrink div on hover
      &:hover div:nth-of-type(1) {
        transform: translateY(calc(${height.current} * 0.2)) scale(1, 1);
      }

      &:hover div:nth-of-type(2) {
        transform: translateY(calc(${height.current} * 0.35)) scale(0.75, 1);
      }

      &:hover div:nth-of-type(3) {
        transform: translateY(calc(${height.current} * 0.5)) scale(0.5, 1);
      }

      &:hover div:nth-of-type(4) {
        transform: translateY(calc(${height.current} * 0.65)) scale(0.75, 1);
      }

      &:hover div:nth-of-type(5) {
        transform: translateY(calc(${height.current} * 0.8)) scale(1, 1);
      }
    `,
    buttonDivStyle: css`
      display: block;
      width: 100%;
      height: 8%;
      max-height: 5px;

      position: absolute;
      top: 0;
      left: 0;

      background-color: ${props.primaryColor};
      border-radius: 20px;

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
        <div
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault()
            handleButtonClicked()
          }}
          css={styles.buttonStyle}
        >
          <div
            css={css`
              ${styles.buttonDivStyle};
              transform: translateY(calc(${height.current} * 0.2));
            `}
          />
          <div
            css={css`
              ${styles.buttonDivStyle};
              transform: translateY(calc(${height.current} * 0.35));
            `}
          />
          <div
            css={css`
              ${styles.buttonDivStyle};
              transform: translateY(calc(${height.current} * 0.5));
            `}
          />
          <div
            css={css`
              ${styles.buttonDivStyle};
              transform: translateY(calc(${height.current} * 0.65));
            `}
          />
          <div
            css={css`
              ${styles.buttonDivStyle};
              transform: translateY(calc(${height.current} * 0.8));
            `}
          />
        </div>
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
    height: 'calc(2vw + 4vh)',
    width: 'calc(2vw + 4vh)',
    minHeight: '30px',
    minWidth: '30px',
  },
  menuVisible: false,
  toggleMenu: () => {},
  primaryColor: '#fff',
  secondaryColor: '#555',
}
