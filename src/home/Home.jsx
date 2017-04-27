import React, { Component } from 'react'
import { Link } from 'react-router'

const links = [
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

export default class Home extends Component {
  constructor() {
    super()

    this.state = { visible: false }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 500)
  }

  render() {
    document.title = 'Tim Stoddard'
    const { visible } = this.state
    return (
      <div className={`home ${visible ? 'home--visible' : ''}`}>
        <div className="home__content">
          <h1 className="home__headerName">
            tim stoddard
          </h1>
          <ul className="home__links">
            {links.map(({ to, text }, index) => (
              <li
                key={index}
                className="home__link">
                <Link
                  to={to}
                  target={to[0] !== '/' ? '_blank' : ''}
                  className="home__linkText">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
