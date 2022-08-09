import { css } from '@emotion/react'

import { CSSProperties, useRef, useState } from 'react'

// ref: https://codepen.io/alvarotrigo/pen/BamvwQB
const ToggleButton = (props: {
  handleToggle: (isToggled: boolean) => void
  style: CSSProperties
  leftText: string
  rightText: string
  untoggledColor: string
  toggledColor: string
}) => {
  // params
  const circleWidth = useRef(40) // percent
  const circleOffset = useRef(5) // percent

  // states
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = (isToggled: boolean) => {
    setIsToggled(isToggled)
    props.handleToggle(isToggled)
  }

  // styles
  const toggleCss = {
    label: css`
      position: relative;
      width: 100%;
      height: 100%;

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
      width: ${circleWidth.current}%;
      aspect-ratio: 1;
      margin-left: ${circleOffset.current}%;

      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      background-color: ${isToggled
        ? props.toggledColor
        : props.untoggledColor};
      border-radius: 50%;

      z-index: 1;
    `,
  }

  const textCss = {
    leftText: css({}),
    rightText: css({}),
    labelContainer: css({
      position: 'absolute',
      top: '-25px',
      width: '300%',

      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',

      color: isToggled ? props.toggledColor : props.untoggledColor,
      fontSize: '14px',

      transition: '0.1s ease',
    }),
  }

  return (
    <div
      style={{
        ...props.style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
      {/* text */}
      <div css={textCss.labelContainer}>
        <div css={textCss.leftText}>{props.leftText}</div>
        <div css={textCss.rightText}>{props.rightText}</div>
      </div>
    </div>
  )
}

ToggleButton.defaultProps = {
  style: {
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    width: '100px',
    height: '50px',
  },
  handleToggle: () => {},
  leftText: '',
  rightText: '',
  untoggledColor: 'black',
  toggledColor: 'white',
}

export default ToggleButton
