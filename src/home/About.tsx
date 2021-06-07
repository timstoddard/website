import * as React from 'react'
import { Link } from 'react-router-dom'
import { Detail, Section, sections } from './about-sections'
import styles from './scss/About.scss'

interface Icon {
  name: string
  href: string
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
]

const IconLinks: React.FunctionComponent = (): JSX.Element => (
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
          title={name}
          className={styles.about__icons__icon} />
      </a>
    ))}
  </div>
)

interface SectionProps {
  section: Section
}

const Section: React.FunctionComponent<SectionProps> = ({ section }: SectionProps): JSX.Element => (
  <>
    <dl className={styles.about__details}>
      <div className={styles.about__details__detailWrapper}>
        <div className={styles.about__details__title}>
          {section.title}
        </div>
      </div>
      {section.details.map(({ field, value }: Detail) => (
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
    <hr className={styles.about__section__divider} />
  </>
)

const DetailSections: React.FunctionComponent = (): JSX.Element => (
  <>
    {sections.map((section: Section, i: number) =>
      <Section
        key={section.title + i}
        section={section} />
    )}
  </>
)

const About: React.FunctionComponent = (): JSX.Element => (
  <div className={styles.about}>
    <h4 className={styles.about__title}>
      <Link to=''>
        Tim Stoddard
      </Link>
    </h4>
      <IconLinks />
      <DetailSections />
  </div>
)

export default About
