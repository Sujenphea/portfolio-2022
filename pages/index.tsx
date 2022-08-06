import { useEffect, useState } from 'react'

import Menu from '../components/Menu'
import MenuButton from '../components/MenuButton'

import ExperienceCanvas from '../experience/ExperienceCanvas'

export default function Home() {
  // states
  const [menuVisible, SetMenuVisible] = useState(true)

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
    </div>
  )
}
