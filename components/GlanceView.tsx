import ProjectType from '../types/projectType'

import projectsJSON from '../data/projects.json'
import worksJSON from '../data/works.json'

// purpose: view projects, works at a glance

// display each project
const ProjectView = (props: { project: ProjectType }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '150px',

        overflowY: 'scroll',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: '0 20px',

          fontSize: '38px',
          textTransform: 'uppercase',
        }}
      >
        {props.project.name}
      </div>
      {/* column */}
      <div
        style={{
          padding: '0px 20px',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'left',
        }}
      >
        <div>{props.project.company}</div>
        <div>{props.project.technologies}</div>
        <div>{props.project.year}</div>
      </div>
    </div>
  )
}

const GlanceView = (props: { visible: boolean }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: props.visible ? 'block' : 'none',

        zIndex: 1,
        overflowY: 'scroll',

        width: '100vw',
        paddingTop: '40px',
        paddingLeft: '40px',

        backgroundColor: 'transparent',
        color: 'white',
      }}
    >
      <h1>Projects</h1>
      {projectsJSON.map((project, i) => (
        <ProjectView project={project} key={i} />
      ))}
      <h1>Works</h1>
      {worksJSON.map((project, i) => (
        <ProjectView project={project} key={i} />
      ))}
    </div>
  )
}

export default GlanceView
