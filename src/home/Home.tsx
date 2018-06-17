import * as React from 'react'
import { Link } from 'react-router-dom'

import Dots from './Dots'

interface HomepageLink {
  to: string
  text: string
}

const links: HomepageLink[] = [
  {
    to: '/about',
    text: 'about',
  },
  {
    to: '/projects',
    text: 'projects',
  },
  {
    to: 'https://drive.google.com/file/d/0B9dz0Ddcl3ESV28wLVZzd2RFNkU/view?usp=sharing',
    text: 'resume',
  },
]

const Home: React.StatelessComponent<{}> = (): JSX.Element => {
  document.title = 'Tim Stoddard'

  return (
    <div className='home'>
      <Dots delay={2000} />
      <div className='home__content'>
        <h1 className='home__headerName'>
          tim stoddard
        </h1>
        <ul className='home__links'>
          {links.map(({ to, text }: HomepageLink) => (
            <li
              key={text}
              className='home__link'>
              <Link
                to={to}
                target={to[0] !== '/' ? '_blank' : ''}
                className='home__linkText'>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
