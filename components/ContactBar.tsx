import { CSSProperties } from 'react'

import {
  faGithub,
  faLinkedin,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialIcon = (props: { icon: IconDefinition; link: string }) => {
  return (
    <a
      style={{
        color: 'white',

        padding: '0px 10px',
      }}
      href={props.link}
    >
      <FontAwesomeIcon
        icon={props.icon}
        style={{
          height: '30px',
        }}
      />
    </a>
  )
}

const ContactBar = (props: { style: CSSProperties }) => {
  return (
    <div style={props.style}>
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
