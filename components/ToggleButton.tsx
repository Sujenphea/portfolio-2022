import { CSSProperties, useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'

// ref: https://codepen.io/alvarotrigo/pen/BamvwQB
const ToggleButton = (props: {
  handleToggle: (isToggled: boolean) => void
  value: boolean
  style: CSSProperties
  leftText: string
  rightText: string
  untoggledColor: string
  toggledColor: string
}) => {
  // params
  const circleWidth = useRef(40) // percent
  const circleOffset = useRef(5) // percent
  const toggleWidth = useRef(85) // percent
  const toggleHeight = useRef(60) // percent

  // states
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = (isToggled: boolean) => {
    setIsToggled(isToggled)
    props.handleToggle(isToggled)
  }

  // hooks
  useEffect(() => {
    setIsToggled(props.value)
  }, [props.value])

  // styles
  const toggleCss = {
    label: css`
      position: relative;
      width: ${toggleWidth.current}%;
      height: ${toggleHeight.current}%;

      display: block;
      margin: 0 auto;

      background-color: ${isToggled
        ? props.untoggledColor
        : props.toggledColor};
      border-radius: 999px;

      transition: 0.3s ease background-color;

      cursor: pointer;
      user-select: none;
      overflow: hidden;
    `,

    circleWrapper: css`
      display: flex;
      justify-content: start;
      align-items: center;

      width: 100%;
      height: 100%;

      transform: ${isToggled
        ? `translate(${
            100 - circleWidth.current - 2 * circleOffset.current - 2
          }%, 0)`
        : ``};
      transition: 0.3s ease;
    `,

    circle: css`
      width: 40%;

      background-color: ${isToggled
        ? props.toggledColor
        : props.untoggledColor};
      margin-left: ${circleOffset.current}%;
      border-radius: 50%;

      z-index: 1;

      &:after {
        content: '';
        display: block;

        /* Ensure the element is a square */
        height: 0;
        width: 100%;
        padding-bottom: 100%;
      }
    `,
  }

  const textCss = {
    leftText: css`
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);

      color: ${isToggled ? props.untoggledColor : props.toggledColor};
      font-size: 14px;
      font-size: calc(60% + 0.2vw + 0.6vh);
    `,
    rightText: css`
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);

      color: ${isToggled ? props.untoggledColor : props.toggledColor};
      font-size: 14px;
      font-size: calc(60% + 0.2vw + 0.6vh);
    `,
  }

  return (
    <div
      style={{
        ...props.style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div css={textCss.leftText}>{props.leftText}</div>

      <input
        type="checkbox"
        id="toggle_checkbox"
        checked={isToggled}
        onChange={(e) => handleToggle(e.target.checked)}
        style={{
          display: 'none',
        }}
      />
      <label htmlFor="toggle_checkbox" css={toggleCss.label}>
        {/* wrapper to move circle */}
        <div css={toggleCss.circleWrapper}>
          {/* circle */}
          <div css={toggleCss.circle} />
        </div>
      </label>

      <div css={textCss.rightText}>{props.rightText}</div>
    </div>
  )
}

ToggleButton.defaultProps = {
  style: {
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    width: '115px',
    height: '80px',
  },
  handleToggle: () => {},
  value: false,
  leftText: '',
  rightText: '',
  untoggledColor: 'black',
  toggledColor: 'white',
}

export default ToggleButton
