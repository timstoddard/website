import classNames from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'

const styles = require('./scss/Links.scss') // tslint:disable-line no-var-requires
const styles2 = require('./scss/Start.scss') // tslint:disable-line no-var-requires

interface HomePageLink {
  name: string
  href: string
}

const links: HomePageLink[] = [
  {
    name: 'Link 1',
    href: 'https://google.com',
  },
  {
    name: 'Link 2',
    href: 'https://google.com',
  },
  {
    name: 'Link 3',
    href: 'https://google.com',
  },
  {
    name: 'Link 4',
    href: 'https://google.com',
  },
  {
    name: 'Link 5',
    href: 'https://google.com',
  },
  {
    name: 'Link 6',
    href: 'https://google.com',
  },
  {
    name: 'Link 7',
    href: 'https://google.com',
  },
  {
    name: 'Link 8',
    href: 'https://google.com',
  },
  {
    name: 'Link 9',
    href: 'https://google.com',
  },
  {
    name: 'Link 10',
    href: 'https://google.com',
  },
  {
    name: 'Link 11',
    href: 'https://google.com',
  },
  {
    name: 'Link 12',
    href: 'https://google.com',
  },
  {
    name: 'Link 13',
    href: 'https://google.com',
  },
  {
    name: 'Link 14',
    href: 'https://google.com',
  },
  {
    name: 'Link 15',
    href: 'https://google.com',
  },
  {
    name: 'Link 16',
    href: 'https://google.com',
  },
]

interface Props {
  className: string
}

export default class Links extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { className } = this.props
    return (
      <div className={classNames(styles.links, className)}>
        <Link
          className={classNames(
            styles.links__item,
            styles2.start__links__item)}
          to=''>
          Home
        </Link>
        {links.map(({ name, href }: HomePageLink) => (
          <a
            key={name}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className={classNames(
              styles.links__item,
              styles2.start__links__item)}>
            {name}
          </a>
        ))}
      </div>
    )
  }
}
