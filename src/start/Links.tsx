import classNames from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { BackgroundUrlType, carNamesForSelect, StartPageCar } from './background-urls'
import { EmptyObject } from '../types'
import styles from './scss/Links.scss'
import styles2 from './scss/Start.scss'

interface HomePageLink {
  name: string
  href: string
}

const links: HomePageLink[] = [
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
  {
    name: 'Link',
    href: 'https://google.com',
  },
]

interface Props {
  backgroundUrlType: BackgroundUrlType
  updateBackgroundUrls: (carType: BackgroundUrlType) => void
  className: string
}

export default class Links extends React.Component<Props, EmptyObject> {
  constructor(props: Props) {
    super(props)
  }

  handleSelectChange = (e: React.ChangeEvent) => {
    const { updateBackgroundUrls } = this.props
    const selectElement = e.target as HTMLSelectElement
    const type = parseInt(selectElement.value, 10) as BackgroundUrlType
    updateBackgroundUrls(type)

    // put selection on hidden element, otherwise if a selection is made
    // and space if pressed, the links will scroll down
    const HIDDEN_FOCUS_ELEMENT_CLASS = styles.links__hiddenFocus
    if (document.querySelectorAll(`.${HIDDEN_FOCUS_ELEMENT_CLASS}`).length === 0) {
      const div = document.createElement('div')
      div.classList.add(HIDDEN_FOCUS_ELEMENT_CLASS)
      div.tabIndex = -1
      div.style.opacity = '0'
      document.body.appendChild(div)
    }
    (document.querySelector(`.${HIDDEN_FOCUS_ELEMENT_CLASS}`) as HTMLDivElement).focus()
  }

  render(): JSX.Element {
    const {
      backgroundUrlType,
      className,
    } = this.props
    const {
      handleSelectChange,
    } = this

    return (
      <div className={classNames(styles.links, className)}>
        <Form
          className={classNames(
            styles.links__item,
            styles2.start__links__item)}>
          <Form.Group>
            <Form.Control
              as='select'
              onChange={handleSelectChange}
              value={backgroundUrlType}>
              {carNamesForSelect.map((car: StartPageCar) => (
                <option
                  key={car.type}
                  value={car.type}>
                  {car.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Link
          className={classNames(
            styles.links__item,
            styles2.start__links__item)}
          to=''>
          Home
        </Link>
        {links.map(({ name, href }: HomePageLink, i: number) => (
          <a
            key={name + i}
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
