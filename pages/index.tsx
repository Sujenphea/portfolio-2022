import { useEffect } from 'react'
import ExperienceCanvas from '../experience/ExperienceCanvas'

export default function Home() {
  useEffect(() => {
    document.title = 'blackmatter'
  })

  return (
    <div
      style={{
        backgroundColor: 'rgb(6, 10, 17)',
      }}
    >
      <ExperienceCanvas />
    </div>
  )
}
