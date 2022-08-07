import { useEffect, useState } from 'react'

import Menu from '../components/Menu'
import MenuButton from '../components/MenuButton'

import GlanceView from '../components/GlanceView'

import ExperienceCanvas from '../experience/ExperienceCanvas'
import ContactBar from '../components/ContactBar'

export default function Home() {
  // states
  const [menuVisible, SetMenuVisible] = useState(false)
  const [glanceViewVisible, SetGlanceViewVisible] = useState(false)

  // hooks
  useEffect(() => {
    document.title = 'blackmatter'
  })

  // handlers
  const handleToggleMenu = () => {
    SetMenuVisible(!menuVisible)
  }

  return (
    <div
      style={{
        backgroundColor: 'rgb(6, 10, 17)',
      }}
    >
      <MenuButton visible={menuVisible} handleToggleMenu={handleToggleMenu} />
      <Menu visible={menuVisible} />
      <ExperienceCanvas menuVisible={menuVisible} />
      <GlanceView visible={glanceViewVisible} />
      <ContactBar
        style={{ position: 'absolute', bottom: '15px', left: '15px' }}
      />
    </div>
  )
}
