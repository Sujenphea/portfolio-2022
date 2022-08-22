import { css } from '@emotion/react'

const Name = () => {
  const styles = {
    containerStyle: css`
      position: absolute;
      top: 25px;
      left: 50vw;
      transform: translateX(-50%);

      text-transform: uppercase;
      color: white;

      z-index: 3;
    `,
  }
  return <div css={styles.containerStyle}>Sujen Phea</div>
}

export default Name
