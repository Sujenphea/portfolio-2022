import { CSSProperties } from 'react'
import { css } from '@emotion/react'

import ProjectViewType from '../types/projectViewType'

import ToggleButton from './ToggleButton'

const Menu = (props: {
  visible: boolean
  toggleView: (toGlanceView: boolean) => void
  projectView: ProjectViewType
}) => {
  // handlers
  const handleToggle = (toGlanceView: boolean) => {
    props.toggleView(toGlanceView)
  }

  // styles
  const animations = {
    normalAnimation: css`
      opacity: ${props.visible ? 1 : 0};
      transition: visibility 0.15s, opacity 0.15s linear;
    `,
  }

  const styles = {
    containerStyle: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      padding-top: 10vh;
      padding-bottom: 10vh;

      display: flex;
      visibility: ${props.visible ? `visible` : `hidden`};
      flex-direction: column;
      justify-content: center;
      align-items: center;

      z-index: 2;
      background-color: transparent;
      color: white;

      ${animations.normalAnimation}
    `,
    toggleButtonStyle: {
      position: 'relative',
      width: 'calc(5vw + 10vh)',
      height: 'calc(5vw + 6vh)',
      maxWidth: '180px',
      maxHeight: '120px',
    } as CSSProperties,
    categoriesStyle: css`
      width: 300px;
      padding: 10px;
      padding-top: 0;
      text-align: center;
    `,
    categoryStyle: css`
      padding: 0px;
      margin: 0;
      font-size: 20px;
      font-size: calc(60% + 0.3vw + 2vh);

      @media (min-height: 300px) {
        margin: 20px;
      }
    `,
  }

  return (
    <div css={styles.containerStyle}>
      <ToggleButton
        style={styles.toggleButtonStyle}
        leftText="immersive"
        rightText="glance"
        handleToggle={handleToggle}
        value={props.projectView === ProjectViewType.Glance}
      />
      <div css={styles.categoriesStyle}>
        <h2 css={styles.categoryStyle}>Work</h2>
        <h2 css={styles.categoryStyle}>Project</h2>
        <h2 css={styles.categoryStyle}>About Me</h2>
      </div>
    </div>
  )
}

export default Menu
