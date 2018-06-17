import * as React from 'react'

interface Icon {
  name: string
  href: string
}

const icons: Icon[] = [
  { name: 'Github', href: 'https://github.com/timstoddard' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/timstoddard200' },
  { name: 'Portfolium', href: 'https://portfolium.com/timstoddard' },
  { name: 'Facebook', href: 'https://facebook.com/timstoddard200' },
]

const IconLinks: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className='about__icons'>
    {icons.map(({ href, name }: Icon) => (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        key={name}>
        <img
          src={`../../media/logos/${name.toLowerCase()}.png`}
          alt={name}
          className='about__icon' />
      </a>
    ))}
  </div>
)

const About: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className='about'>
    <div className='about__container'>
      <h4 className='about__title'>
        Tim Stoddard
      </h4>
      <p className='about__text'>
        Hi! I am a 3rd year student at&nbsp;
        <a
          className='about__link'
          href='http://calpoly.edu'
          target='_blank'
          rel='noopener noreferrer'>
          Cal Poly, San Luis Obispo
        </a>
        &nbsp;majoring Computer Science and minoring in Entrepreneurship.
      </p>
      <p className='about__text'>
        I am currently a software engineering intern at&nbsp;
        <a
          className='about__link'
          href='https://socreate.it'
          target='_blank'
          rel='noopener noreferrer'>
          SoCreate
        </a>
        , where I regularly work with Angular 2, PHP, and MS SQL.
        Other technologies I use there include Git, Jira, and BitBucket.
      </p>
      <p className='about__text'>
        I also lift weights several times a week, a passion that I have enjoyed since my sophomore year of high school.
      </p>
      <p className='about__text'>
        Feel free to have a look around the site and/or&nbsp;
        <a
          className='about__link'
          href='mailto:tstoddar@calpoly.edu?subject=Hello!'>
          contact me
        </a>
        &nbsp;if you are interested in working together!
      </p>
      <IconLinks />
    </div>
  </div>
)

export default About
