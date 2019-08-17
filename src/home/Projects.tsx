import * as React from 'react'
import { Link } from 'react-router-dom'

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
        name: 'Battery Status (Chrome only)',
        link: '/battery',
        inProgress: false,
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
      {
        name: 'ES6 Import Fixer',
        link: '/imports',
        inProgress: false,
      },
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

const Projects: React.StatelessComponent<{}> = (): JSX.Element => {
  document.title = 'Tim\'s Projects'
  return (
    <div className='projects'>
      <h4 className='projects__mainTitle'>
        Tim&rsquo;s Javascript Projects
      </h4>
      <hr className='projects__divider' />
      {projectSections.map(({ name: sectionName, projects }: Section) => (
        <React.Fragment key={sectionName}>
          <h5 className='projects__title'>
            {sectionName}
          </h5>
          <ul className='projects__section'>
            {projects.map(({ name: projectName, link, inProgress }: Project) => (
              <li
                className='projects__linkWrapper'
                key={projectName}>
                <Link to={link}>
                  <span className={`projects__link ${inProgress ? 'projects__link--inProgress' : ''}`}>
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
