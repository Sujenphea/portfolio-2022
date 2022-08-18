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
  const styles = {
    containerStyle: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;

      display: ${props.visible ? `flex` : `none`};
      flex-direction: column;
      justify-content: center;
      align-items: center;

      z-index: 2;
      background-color: transparent;
      color: white;
    `,
    toggleButtonStyle: {
      position: 'relative',
      width: '20vw',
      height: '35vw', // aspect ratio of 1.5
      maxWidth: '180px',
      maxHeight: '120px',
    } as CSSProperties,
    categoriesStyle: css`
      width: 300px;
      padding: 10px;
      text-align: center;
    `,
    categoryStyle: css`
      padding: 0px;
      margin: 5px;
      font-size: 20px;
      font-size: calc(100% + 0.75vw + 0.75vh);

      @media (min-width: 768px) {
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
