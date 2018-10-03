import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'

import courses, { Course } from '../_shared/courses'

interface SidebarLinkProps {
  inDropdown?: boolean
  href: string
  name: string
}

const SidebarLink: React.StatelessComponent<SidebarLinkProps> = ({
  inDropdown,
  href,
  name,
}: SidebarLinkProps): JSX.Element => (
  <a
    className={`black-text ${inDropdown ? '' : 'links__collectionItem collection-item'}`}
    href={href}
    target='_blank'
    rel='noopener noreferrer'>
    {name}
  </a>
)

SidebarLink.propTypes = {
  inDropdown: PropTypes.bool,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

SidebarLink.defaultProps = {
  inDropdown: false,
}

const setupDropdownLinks = (
  courseId: number,
  gdriveFolderId: string,
  otherLinks: HomePageLink[] = [],
): HomePageLink[] => {
  const dropdownItems: HomePageLink[] = []
  if (courseId > 0) {
    dropdownItems.push(
      {
        name: 'Home',
        href: `https://polylearn.calpoly.edu/AY_2018-2019/course/view.php?id=${courseId}`,
      },
      {
        name: 'Grades',
        href: `https://polylearn.calpoly.edu/AY_2018-2019/grade/report/user/index.php?id=${courseId}`,
      },
    )
  }
  dropdownItems.push({
    name: 'Drive',
    href: `https://drive.google.com/drive/folders/${gdriveFolderId}`,
  })
  otherLinks.forEach(({ name, href }: HomePageLink) => {
    dropdownItems.push({ name, href })
  })
  return dropdownItems
}

interface DropdownProps {
  courseId: number
  index: number
  gdriveFolderId: string
  otherLinks: HomePageLink[]
}

const Dropdown: React.StatelessComponent<DropdownProps> = ({
  courseId,
  index,
  gdriveFolderId,
  otherLinks,
}: DropdownProps): JSX.Element => (
  <ul
    id={`dropdown${index}`}
    className='dropdown-content'>
    {setupDropdownLinks(courseId, gdriveFolderId, otherLinks)
      .map(({ name, href }: HomePageLink) => (
        <li key={href}>
          <SidebarLink
            name={name}
            href={href}
            inDropdown={true} />
        </li>
      ))}
  </ul>
)

Dropdown.propTypes = {
  courseId: PropTypes.number,
  index: PropTypes.number.isRequired,
  gdriveFolderId: PropTypes.string.isRequired,
  otherLinks: PropTypes.array,
}

Dropdown.defaultProps = {
  courseId: 0,
  otherLinks: [],
}

interface DropdownActivatorProps {
  index: number
  courseName: string
}

const DropdownActivator: React.StatelessComponent<DropdownActivatorProps> = ({
  index,
  courseName,
}: DropdownActivatorProps): JSX.Element => (
  <a
    className='links__collectionItem collection-item dropdown-button black-text'
    data-activates={`dropdown${index}`}>
    {courseName}
  </a>
)

DropdownActivator.propTypes = {
  courseName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

interface HomePageLink {
  name: string
  href: string
}

const links: HomePageLink[] = [
  {
    name: 'Portal',
    href: 'https://my.calpoly.edu',
  },
  {
    name: 'Grades',
    href: 'https://docs.google.com/spreadsheets/d/1iJBFshNawvpG4JOUBNa9tkxefSHW8a67lVleAWVwH3Y',
  },
  {
    name: 'Student Center',
    // tslint:disable-next-line:max-line-length
    href: 'https://idp.calpoly.edu/idp/profile/cas/login?service=https://cmsweb.calpoly.edu/psp/CSLOPRD/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER%26IsFolder=false%26IgnoreParamTempl=FolderPath%2cIsFolder%26RL=%26target=main0%26navc=2398?cmd=login%26languageCd=ENG%26userid=PS%26pwd=z&method=post',
  },
  {
    name: 'Poly Profile',
    href: 'https://dashboards.calpoly.edu/dw/polydata/student_poly_profile_self_svc.display',
  },
  {
    name: 'PASS',
    href: 'https://pass.calpoly.edu/login.do',
  },
  {
    name: 'Poly Planner',
    href: 'https://polyplanner.calpoly.edu',
  },
  {
    name: 'Degree Reqs',
    href: 'http://flowcharts.calpoly.edu/downloads/curric/15-17.Computer%20Science.pdf',
  },
  {
    name: 'Degree Flowchart',
    href: 'http://flowcharts.calpoly.edu/downloads/mymap/15-17.52CSCBSU.pdf',
  },
  {
    name: '18-19 Calendar',
    href: 'http://registrar.calpoly.edu/2018-19-academic-calendar',
  },
  {
    name: 'Floor Plans',
    href: 'https://afd.calpoly.edu/facilities/maps_floorplans.asp',
  },
  {
    name: 'Cal Poly Links',
    href: 'https://myportalisdown-calpoly-edu.s3.amazonaws.com/main.html',
  },
]

interface Props {
  className: string
}

export default class Links extends React.Component<Props, {}> {
  static propTypes: any = {
    className: PropTypes.string.isRequired,
  }

  constructor(props: Props) {
    super(props)
  }

  componentDidMount(): void {
    ($('.dropdown-button') as any).dropdown()
  }

  render(): JSX.Element {
    const { className } = this.props
    return (
      <div className={`links__collection collection ${className}`}>
        {courses.map(({ id, gdriveFolderId, otherLinks }: Course, index: number) => (
          <Dropdown
            key={gdriveFolderId}
            index={index}
            courseId={id}
            gdriveFolderId={gdriveFolderId}
            otherLinks={otherLinks} />
        ))}
        {courses.map(({ name }: Course, index: number) => (
          <DropdownActivator
            key={name}
            index={index}
            courseName={name} />
        ))}
        <div className='divider' />
        <Link
          className='links__collectionItem collection-item black-text'
          to=''>
          Home
        </Link>
        {links.map(({ name, href }: HomePageLink) => (
          <SidebarLink
            key={name}
            name={name}
            href={href} />
        ))}
      </div>
    )
  }
}
