import classNames from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './scss/Projects.scss'

interface Section {
  name: string
  projects: Project[]
}

interface Project {
  name: string
  link: string
  inProgress: boolean
}

const projectSections: Section[] = [
  {
    name: 'Utilities',
    projects: [
      {
        name: 'Periodic Table',
        link: 'periodic-table',
        inProgress: false,
      },
      {
        name: 'Battery Status (Chrome only)',
        link: '/battery',
        inProgress: false,
      },
      {
        name: 'Sudoku Helper',
        link: '/sudoku',
        inProgress: true,
      },
      {
        name: 'E85 Calculator',
        link: '/e85',
        inProgress: false,
      },
      {
        name: 'Max-Heap Visualizer',
        link: '/heap',
        inProgress: false,
      },
      // {
      //   name: 'ES6 Import Fixer',
      //   link: '/imports',
      //   inProgress: false,
      // },
      {
        name: 'Javascript Clock',
        link: '/time',
        inProgress: false,
      },
      {
        name: 'To-Do List',
        link: '/todo',
        inProgress: false,
      },
    ],
  },
  {
    name: 'Games',
    projects: [
      {
        name: 'Car Crash Bingo',
        link: '/bingo',
        inProgress: false,
      },
      {
        name: 'Incremental Game',
        link: '/incr-game',
        inProgress: true,
      },
      {
        name: 'Rice Purity Test',
        link: '/rice-purity-test',
        inProgress: false,
      },
    ],
  },
  {
    name: 'Art/Experiments',
    projects: [
      {
        name: 'Infinite Recursion Demo',
        link: '/infinity',
        inProgress: false,
      },
      {
        name: 'Bezier Curve Text',
        link: '/bezier-curve',
        inProgress: false,
      },
      {
        name: 'Candle Simulation',
        link: '/flicker',
        inProgress: false,
      },
      {
        name: 'Pride Flag',
        link: '/pride',
        inProgress: false,
      },
      {
        name: 'Screen Strobe',
        link: '/strobe',
        inProgress: false,
      },
      {
        name: 'Fun Text Tools',
        link: '/text-tools',
        inProgress: false,
      },
      {
        name: 'Trippy Animation',
        link: '/trippy',
        inProgress: false,
      },
      {
        name: 'Calm Animation',
        link: '/zen',
        inProgress: false,
      },
    ],
  },
]

const Projects: React.FunctionComponent = (): JSX.Element => {
  document.title = 'Tim\'s Projects'
  return (
    <div className={styles.projects}>
      <h4 className={styles.projects__mainTitle}>
        Tim&rsquo;s Javascript Projects
      </h4>
      <hr className={styles.projects__divider} />
      {projectSections.map(({ name: sectionName, projects }: Section) => (
        <React.Fragment key={sectionName}>
          <h5 className={styles.projects__title}>
            {sectionName}
          </h5>
          <ul className={styles.projects__section}>
            {projects.map(({ name: projectName, link, inProgress }: Project) => (
              <li
                className={styles.projects__linkWrapper}
                key={projectName}>
                <Link to={link}>
                  {/* tslint:disable-next-line:max-line-length */}
                  <span className={classNames(
                    styles.projects__link,
                    { [styles['projects__link--inProgress']]: inProgress })}>
                    {projectName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Projects
