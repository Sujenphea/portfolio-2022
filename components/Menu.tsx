import { css } from '@emotion/react'

import ToggleButton from './ToggleButton'

const Menu = (props: {
  visible: boolean
  toggleView: (isGlanceView: boolean) => void
}) => {
  // handlers
  const handleToggle = (isGlanceView: boolean) => {
    props.toggleView(isGlanceView)
  }

  // styles
  const textCss = css`
    padding: 0px;
    margin: 5px;
    font-size: 20px;
    font-size: calc(100% + 0.75vw + 0.75vh);

    @media (min-width: 768px) {
      margin: 20px;
    }
  `

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,

        zIndex: 2,

        width: '100vw',
        height: '100vh',

        display: props.visible ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'transparent',
        color: 'white',
      }}
    >
      <ToggleButton
        style={{
          position: 'relative',
          width: '20vw',
          aspectRatio: '1.5',
          maxWidth: '180px',
          maxHeight: '120px',
        }}
        leftText="immersive"
        rightText="glance"
        handleToggle={handleToggle}
      />
      <div
        style={{
          width: '300px',
          padding: '10px',

          textAlign: 'center',
        }}
      >
        <h2 css={textCss}>Work</h2>
        <h2 css={textCss}>Project</h2>
        <h2 css={textCss}>About Me</h2>
      </div>
    </div>
  )
}

export default Menu
