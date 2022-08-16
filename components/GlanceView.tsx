import { css } from '@emotion/react'

import ProjectType from '../types/projectType'

import projectsJSON from '../data/projects.json'
import worksJSON from '../data/works.json'

// purpose: view projects, works at a glance

// display each project
const ProjectView = (props: {
  project: ProjectType
  projectClicked: () => void
}) => {
  // styles
  const styles = {
    containerCss: css`
      position: relative;
      width: 100%;
      height: 200px;
      padding-left: 80px;

      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;

      overflow-y: scroll;
      overflow-x: hidden;

      text-align: start;
      border-top: 1px solid white;

      &:hover {
        cursor: pointer;
      }

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    `,
    columnCss: css`
      display: flex;
      flex-direction: column;
      justify-content: left;
      align-items: left;

      @media (min-width: 768px) {
        padding-left: 40px;
      }
    `,
    titleCss: css`
      text-transform: uppercase;
      font-size: 24px;
      font-size: calc(100% + 1.5vw + 1vh);
    `,
  }

  return (
    <div css={styles.containerCss} onClick={props.projectClicked}>
      <div css={styles.titleCss}>{props.project.name}</div>
      {/* column */}
      <div css={styles.columnCss}>
        <div>{props.project.company}</div>
        <div>{props.project.technologies}</div>
        <div>{props.project.year}</div>
      </div>
    </div>
  )
}

const GlanceView = (props: {
  visible: boolean
  handleProjectClicked: (project: ProjectType) => void
}) => {
  // styles
  const styles = {
    containerCss: css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      display: ${props.visible ? `block` : `none`};
      width: 100%;
      padding-top: 40px;

      z-index: 1;
      overflow-y: scroll;
      overflow-x: hidden;

      text-align: center;
      background-color: transparent;
      color: white;

      @media (min-width: 768px) {
        text-align: start;
      }
    `,
    titleCss: css`
      font-size: 32px;
      font-size: calc(100% + 1.5vw + 1.5vh);

      @media (min-width: 768px) {
        padding-left: 80px;
      }
    `,
  }

  return (
    <div css={styles.containerCss}>
      <h1 css={styles.titleCss}>Projects</h1>
      {projectsJSON.map((project, i) => (
        <ProjectView
          project={project}
          key={i}
          projectClicked={() => {
            props.handleProjectClicked(project)
          }}
        />
      ))}
      <h1 css={styles.titleCss}>Works</h1>
      {worksJSON.map((project, i) => (
        <ProjectView
          project={project}
          key={i}
          projectClicked={() => {
            props.handleProjectClicked(project)
          }}
        />
      ))}
    </div>
  )
}

export default GlanceView
