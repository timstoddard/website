import * as React from 'react'
import { Link } from 'react-router-dom'
import Dots from './Dots'

const styles = require('./scss/Home.scss') // tslint:disable-line no-var-requires

interface HomepageLink {
  pathname: string
  text: string
}

const links: HomepageLink[] = [
  {
    pathname: '/about',
    text: 'about',
  },
  {
    pathname: '/projects',
    text: 'projects',
  },
  {
    pathname: 'https://drive.google.com/file/d/0B9dz0Ddcl3ESV28wLVZzd2RFNkU/view?usp=sharing',
    text: 'resume',
  },
]

const Home: React.StatelessComponent<{}> = (): JSX.Element => {
  document.title = 'Tim Stoddard'

  return (
    <div className={styles.home}>
      <Dots delay={200} />
      <div className={styles.home__content}>
        <h1 className={styles.home__headerName}>
          tim stoddard
        </h1>
        <ul className={styles.home__links}>
          {links.map(({ pathname, text }: HomepageLink) => (
            <li
              key={text}
              className={styles.home__link}>
              <Link
                to={{ pathname }}
                target={pathname[0] !== '/' ? '_blank' : ''}
                className={styles.home__linkText}>
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
