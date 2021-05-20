import * as React from 'react'
import styles from './scss/About.scss'

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

const IconLinks: React.FunctionComponent<{}> = (): JSX.Element => (
  <div className={styles.about__icons}>
    {icons.map(({ href, name }: Icon) => (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        key={name}>
        <img
          src={`../../media/logos/${name.toLowerCase()}.png`}
          alt={name}
          className={styles.about__icons__icon} />
      </a>
    ))}
  </div>
)

const Details: React.FunctionComponent<{}> = (): JSX.Element => (
  <dl className={styles.about__details}>
    {details.map(({ field, value }: Detail) => (
      <div
        key={field}
        className={styles.about__details__detailWrapper}>
        <dt className={styles.about__details__field}>
          {field}
        </dt>
        <dd className={styles.about__details__value}>
          {value}
        </dd>
      </div>
    ))}
  </dl>
)

const About: React.FunctionComponent<{}> = (): JSX.Element => (
  <div className={styles.about}>
      <h4 className={styles.about__title}>
        Tim Stoddard
      </h4>
      <Details />
      <IconLinks />
  </div>
)

export default About
