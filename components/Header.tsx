import { CSSProperties } from 'react'
import { css } from '@emotion/react'

import MenuButton from './MenuButton'

const Header = (props: { menuVisible: boolean; toggleMenu: () => void }) => {
  const styles = {
    containerStyle: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: calc(5vh + 5vw);
      max-height: 100px;

      display: flex;
      justify-content: right;
      align-items: center;

      color: rgb(200, 200, 200);
    `,
    // centered absolutely
    nameStyle: css`
      position: absolute;
      left: 50vw;
      transform: translateX(-50%);

      font-family: SourceSansPro;
      font-weight: 400;
      font-size: calc(70% + 0.9vw + 0.9vh);
      text-transform: uppercase;
      color: inherit;

      z-index: 3;
    `,
    // placed on the right
    menuButtonStyle: {
      position: 'relative',

      height: 'calc(1.5vw + 3vh)',
      width: 'calc(1.5vw + 3vh)',
    } as CSSProperties,
  }

  return (
    <div css={styles.containerStyle}>
      <div css={styles.nameStyle}>Sujen Phea</div>
      <MenuButton
        style={styles.menuButtonStyle}
        menuVisible={props.menuVisible}
        toggleMenu={props.toggleMenu}
      />
    </div>
  )
}

export default Header
