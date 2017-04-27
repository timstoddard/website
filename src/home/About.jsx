import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const IconLinks = ({ icons }) =>
  <div className="about__icons">
    {icons.map(({ href, name }) =>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={name}>
        <img
          src={`../../media/logos/${name.toLowerCase()}.png`}
          alt={name}
          className="about__icon"
          />
      </a>
    )}
  </div>

IconLinks.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.object),
}

IconLinks.defaultProps = {
  icons: [
    { name: 'Github', href: 'https://github.com/timstoddard' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/timstoddard200' },
    { name: 'Portfolium', href: 'https://portfolium.com/timstoddard' },
    { name: 'Facebook', href: 'https://facebook.com/timstoddard200' },
  ],
}

const About = () => {
  document.title = 'About Me'
  return (
    <div className="about">
      <div className="about__container container">
        <h5 className="about__title center-align">
          About Me
        </h5>
        <p className="about__text">
          Hi, I&apos;m Tim! I am a second year student at&nbsp;
          <a
            className="about__link"
            href="http://calpoly.edu"
            target="_blank"
            rel="noopener noreferrer">
            Cal Poly, San Luis Obispo
          </a>
          &nbsp;studying Computer Science.
        </p>
        <p className="about__text">
          I am currently a software engineering intern at&nbsp;
          <a
            className="about__link"
            href="https://socreate.it"
            target="_blank"
            rel="noopener noreferrer">
            SoCreate
          </a>
          , where I regularly work with Angular 2, PHP, and MS SQL. Other technologies I&apos;ve used there include Git, Jira, and BitBucket.
        </p>
        <p className="about__text">
          In my free time, I am learning ReactJS - in fact, this site uses React and React Router. I also lift weights several times a week, a passion that I have enjoyed since my sophomore year of high school.
        </p>
        <p className="about__text">
          Feel free to have a look around the site and/or&nbsp;
          <a
            className="about__link"
            href="mailto:tstoddar@calpoly.edu?subject=Saw%20your%20site%20and%20would%20like%20to%20get%20in%20touch%20with%20you!">
            contact me
          </a>
          &nbsp;if you are interested in working together!
        </p>
        <IconLinks />
        <Link to="">
          <h5 className="about__link center-align">
            Back
          </h5>
        </Link>
      </div>
    </div>
  )
}

export default About
