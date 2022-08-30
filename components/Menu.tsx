import { CSSProperties } from 'react'
import { css, SerializedStyles } from '@emotion/react'

import ProjectViewType from '../types/projectViewType'

import ToggleButton from './ToggleButton'

const Menu = (props: {
  styles: SerializedStyles
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
      padding-top: clamp(0px, 80px, calc(5vh + 5vw));
      padding-bottom: 10vh;

      display: flex;
      visibility: ${props.visible ? `visible` : `hidden`};
      flex-direction: column;
      align-items: center;

      z-index: 2;
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
    <div css={[styles.containerStyle, props.styles]}>
      <ToggleButton
        style={styles.toggleButtonStyle}
        leftText="immersive"
        rightText="glance"
        handleToggle={handleToggle}
        value={props.projectView === ProjectViewType.Glance}
        untoggledColor="rgb(201, 201, 254)"
        toggledColor="rgb(255, 255, 255)"
      />
    </div>
  )
}

export default Menu
