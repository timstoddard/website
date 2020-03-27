import * as React from 'react'

interface Icon {
  name: string
  href: string
}

interface Detail {
  field: string
  value: string
}

const icons: Icon[] = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/timstoddard200',
 },
  {
    name: 'Github',
    href: 'https://github.com/timstoddard',
 },
//   {
//     name: 'Portfolium',
//     href: 'https://portfolium.com/timstoddard',
//  },
//   {
//     name: 'Facebook',
//     href: 'https://facebook.com/timstoddard200',
//  },
]

const details: Detail[] = [
  {
    field: 'School',
    value: 'Cal Poly SLO',
  },
  {
    field: 'Major',
    value: 'Computer Science',
  },
  {
    field: 'Minor',
    value: 'Entrepreneurship',
  },
  {
    field: 'Company',
    value: 'Amazon Web Services',
  },
  {
    field: 'Role',
    value: 'SDE Intern',
  },
  {
    field: 'Skills',
    value: 'Angular, React, Typescript, Node.js, Java, Python, SQL, C++',
  },
  {
    field: 'Hobbies',
    value: 'Lifting weights, cars',
  },
]

const IconLinks: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className='about__icons'>
    {icons.map(({ href, name }: Icon) => (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        key={name}
        className='about__icons__link'>
        <img
          src={`../../media/logos/${name.toLowerCase()}.png`}
          alt={name}
          className={'about__icons__icon'} />
      </a>
    ))}
  </div>
)

const Details: React.StatelessComponent<{}> = (): JSX.Element => (
  <dl className='about__details'>
    {details.map(({ field, value }: Detail) => (
      <div
        key={field}
        className='about__details__detailWrapper'>
        <dt className='about__details__field'>
          {field}
        </dt>
        <dd className='about__details__value'>
          {value}
        </dd>
      </div>
    ))}
  </dl>
)

const About: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className='about'>
      <h4 className='about__title'>
        Tim Stoddard
      </h4>
      <Details />
      <IconLinks />
  </div>
)

export default About
