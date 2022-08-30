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
      padding-left: 8vw;

      display: flex;
      flex-direction: column;
      justify-content: center;
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
        justify-content: start;
        align-items: center;
      }
    `,
    titleCss: css`
      text-transform: uppercase;
      font-weight: 400;
      font-size: 24px;
      font-size: calc(100% + 1.5vw + 1vh);
    `,
    columnCss: css`
      display: flex;
      flex-direction: column;
      justify-content: left;
      align-items: left;

      font-family: SourceSansPro;
      font-weight: 300;
      font-size: 16px;
      font-size: calc(60% + 0.5vw + 0.5vh);

      @media (min-width: 768px) {
        padding-left: 40px;
      }
    `,
    detailCss: css`
      padding-top: 5px;
      padding-bottom: 5px;
    `,
    nonWorkCss: css`
      display: ${props.project.isWork ? `none` : ``};
    `,
  }

  return (
    <div css={styles.containerCss} onClick={props.projectClicked}>
      <div css={styles.titleCss}>{props.project.name}</div>
      {/* column */}
      <div css={styles.columnCss}>
        <div css={styles.detailCss}>{props.project.company}</div>
        <div css={[styles.detailCss, styles.nonWorkCss]}>
          {props.project.technologies}
        </div>
        <div css={styles.detailCss}>{props.project.year[0]}</div>
      </div>
    </div>
  )
}

const GlanceView = (props: {
  visible: boolean
  handleProjectClicked: (project: ProjectType) => void
}) => {
  // styles
  const animations = {
    normalAnimation: css`
      opacity: ${props.visible ? 1 : 0};
      transition: visibility 0.2s, opacity 0.2s linear, background-color 0.2s;
    `,
  }

  const styles = {
    containerCss: css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      display: block;
      visibility: ${props.visible ? `visible` : `hidden`};
      width: 100%;
      padding-top: 40px;

      z-index: 1;
      overflow-y: scroll;
      overflow-x: hidden;

      text-align: center;
      color: white;

      ${animations.normalAnimation}

      @media (min-width: 768px) {
        text-align: start;
      }
    `,
    titleCss: css`
      text-transform: uppercase;
      font-weight: 600;
      font-size: 32px;
      font-size: calc(100% + 1.8vw + 1.8vh);

      @media (min-width: 768px) {
        padding-left: 3vw;
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
