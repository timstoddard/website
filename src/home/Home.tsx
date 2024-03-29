import * as React from 'react'
import { Link } from 'react-router-dom'
import Dots from './Dots'
import styles from './scss/Home.scss'

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
    pathname: 'https://drive.google.com/file/d/0B9dz0Ddcl3ESV28wLVZzd2RFNkU/view?usp=sharing',
    text: 'resume',
  },
  {
    pathname: '/projects',
    text: 'more',
  },
]

const Home: React.FunctionComponent = (): JSX.Element => {
  document.title = 'Tim Stoddard'

  const setIfExternalPath = (pathname: string, value: string): string =>
    pathname[0] !== '/' ? value : ''

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
                target={setIfExternalPath(pathname, '_blank')}
                rel={setIfExternalPath(pathname, 'noopener noreferrer')}
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
