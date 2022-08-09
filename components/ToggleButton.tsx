import { css } from '@emotion/react'

import { CSSProperties, useRef, useState } from 'react'

// ref: https://codepen.io/alvarotrigo/pen/BamvwQB
const ToggleButton = (props: {
  handleToggle: (isToggled: boolean) => void
  style: CSSProperties
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

      background-color: ${isToggled ? `#000` : `#fff`};
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

      background-color: ${isToggled ? `#fff` : `#000`};
      border-radius: 50%;

      z-index: 1;
    `,
  }

  return (
    <div style={props.style}>
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
    </div>
  )
}

export default ToggleButton
