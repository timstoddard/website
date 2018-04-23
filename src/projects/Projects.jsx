import React from 'react'
import { Link } from 'react-router-dom'

const projects = [
  {
    name: 'Utilities',
    links: [
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
    links: [
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
    links: [
      {
        name: 'Infinite Recursion Demo',
        link: '/infinity',
        inProgress: false,
      },
      {
        name: 'Screen Strobe',
        link: '/strobe',
        inProgress: false,
      },
      {
        name: 'Trippy Animation',
        link: '/trippy',
        inProgress: false,
      },
      {
        name: 'Peaceful Animation',
        link: '/zen',
        inProgress: false,
      },
    ],
  },
]

const Projects = () => {
  document.title = 'Tim\'s Projects'
  return (
    <div className="projects">
      <div className="projects__container">
        <h4 className="projects__mainTitle">
          Tim&rsquo;s Projects
        </h4>
        <hr className="projects__divider" />
        {projects.map(({ name, links }) => (
          <div
            key={name}
            className="projects__group">
            <h5 className="projects__title">
              {name}
            </h5>
            <ul className="projects__group__list">
              {links.map(({ name, link, inProgress }) => (
                <li key={name}>
                  <Link to={link}>
                    <h6 className={`projects__link ${inProgress ? 'projects__link--inProgress' : ''}`}>
                      {name}
                    </h6>
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="projects__divider" />
          </div>
        ))}
        <h5 className="center-align">
          <Link
            to=""
            className="projects__link">
            Back
          </Link>
        </h5>
      </div>
    </div>
  )
}

export default Projects
