import { CSSProperties } from 'react'
import { css } from '@emotion/react'

import {
  faGithub,
  faLinkedin,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialIcon = (props: { icon: IconDefinition; link: string }) => {
  // styles
  const styles = {
    linkStyle: css`
      color: white;
      padding: 0 10px;
    `,
    iconStyle: css`
      height: 30px;
    `,
  }

  return (
    <a css={styles.linkStyle} href={props.link} target="_blank">
      <FontAwesomeIcon icon={props.icon} css={styles.iconStyle} />
    </a>
  )
}

const ContactBar = (props: { style: CSSProperties }) => {
  return (
    <div style={{ ...props.style, zIndex: 4 }}>
      <SocialIcon
        icon={faLinkedin}
        link={'https://www.linkedin.com/in/sujenphea/'}
      />
      <SocialIcon icon={faGithub} link={'https://www.github.com/sujenphea/'} />
      <SocialIcon icon={faEnvelope} link={'mailto:sujenphea@gmail.com'} />
    </div>
  )
}

export default ContactBar
