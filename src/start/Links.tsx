import * as React from 'react'
import { Link } from 'react-router-dom'

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
      <div className={`links ${className}`}>
        <Link
          className='links__item start__links__item'
          to=''>
          Home
        </Link>
        {links.map(({ name, href }: HomePageLink) => (
          <a
            key={name}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='links__item start__links__item'>
            {name}
          </a>
        ))}
      </div>
    )
  }
}
