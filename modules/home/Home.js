import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  getInitialState() {
    return {
      visible: false,
      links: [
        {
          to: '/about',
          text: 'about',
          external: false
        },
        {
          to: '/projects',
          text: 'projects',
          external: false
        },
        {
          to: 'https://drive.google.com/file/d/0B9dz0Ddcl3ESV28wLVZzd2RFNkU/view?usp=sharing',
          text: 'resume',
          external: true
        }
      ]
    }
  },
  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 500)
  },
  render() {
    document.title = 'Tim Stoddard'
    return (
      <div className={`home ${this.state.visible ? 'home--visible' : ''}`}>
        <h1 className="home__headerName">
          tim stoddard
        </h1>
        <ul className="home__links">
          {this.state.links.map((link, index) => (
            <li
              key={index}
              className="home__link">
              <Link
                to={link.to}
                target={link.external ? '_blank' : '_self'}
                className="home__linkText">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
