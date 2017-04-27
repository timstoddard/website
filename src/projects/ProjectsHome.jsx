import React from 'react'
import { Link } from 'react-router'

const links = [
  { name: 'Car Crash Bingo', href: '/projects/bingo' },
  { name: 'Max-Heap Visualizer', href: '/projects/heap' },
  { name: 'Angular 2 (ES6) Import Fixer', href: '/projects/imports' },
  { name: 'Strobe Light!', href: '/projects/strobe' },
  { name: 'Javascript Clock', href: '/projects/time' },
  { name: 'Zen Mode (Peaceful, Infinite Animation)', href: '/projects/zen' },
]

const ProjectsHome = () => {
  document.title = 'Projects'
  return (
    <div className="projectsHome">
      <div className="projectsHome__container container">
        <h5 className="projectsHome__title">
          Check out some of the cool things I&apos;ve made!
        </h5>
        <p>Most of these projects were originally written in vanilla Javascript + jQuery, so I rewrote them in React to work with this site. Click on any project&apos;s name to view it!</p>
        <ul>
          {links.map(({ name, href }) =>
            <li key={name}>
              <Link to={href}>
                <h5 className="projectsHome__link projectsHome__link--project">
                  {name}
                </h5>
              </Link>
            </li>
          )}
        </ul>
        <hr className="projectsHome__divider" />
        <h5 className="center-align">
          <Link
            to=""
            className="projectsHome__link">
            Back
          </Link>
        </h5>
      </div>
    </div>
  )
}

export default ProjectsHome
