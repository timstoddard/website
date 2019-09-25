import * as React from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom'

import courses, { Course } from '../_shared/courses'

interface SidebarLinkProps {
  inDropdown?: boolean
  href: string
  name: string
}

const SidebarLink: React.StatelessComponent<SidebarLinkProps> = ({
  inDropdown = false,
  href,
  name,
}: SidebarLinkProps): JSX.Element => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={`black-text links__collectionItem collection-item ${inDropdown ? 'blue lighten-5' : ''}`}>
    {name}
  </a>
)

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
        href: `https://polylearn.calpoly.edu/AY_2019-2020/course/view.php?id=${courseId}`,
      },
      {
        name: 'Grades',
        href: `https://polylearn.calpoly.edu/AY_2019-2020/grade/report/user/index.php?id=${courseId}`,
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

interface DropdownActivatorProps {
  courseId: number
  courseName: string
  gdriveFolderId: string
  otherLinks: HomePageLink[]
}

interface DropdownActivatorState {
  isOpen: boolean
}

class CourseDropdownActivator extends React.Component<DropdownActivatorProps, DropdownActivatorState> {
  constructor(props: DropdownActivatorProps) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  onClick = (): void => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render(): JSX.Element {
    const {
      onClick,
    } = this
    const {
      courseId,
      courseName,
      gdriveFolderId,
      otherLinks,
    } = this.props
    const {
      isOpen,
    } = this.state

    return (
      <>
        <a
          onClick={onClick}
          className='links__collectionItem collection-item black-text'>
          {courseName}
        </a>
        {isOpen && (
          setupDropdownLinks(courseId, gdriveFolderId, otherLinks)
            .map(({ name, href }: HomePageLink) => (
              <SidebarLink
                key={href}
                name={name}
                href={href}
                inDropdown={true} />
            ))
        )}
      </>
    )
  }
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
    name: '19-20 Calendar',
    href: 'https://registrar.calpoly.edu/2019-20-academic-calendar',
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
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { className } = this.props
    return (
      <div className={`links__collection collection ${className}`}>
        {courses.map(({ id, name, gdriveFolderId, otherLinks }: Course) => (
          <CourseDropdownActivator
            key={name}
            courseId={id}
            courseName={name}
            gdriveFolderId={gdriveFolderId}
            otherLinks={otherLinks} />
        ))}
        {/* {courses.map(({ name: courseName, id: courseId, gdriveFolderId, otherLinks }: Course, index: number) => (
          <DropdownButton
            key={name}
            id={gdriveFolderId}
            title={name}>
            <Dropdown.Menu>
              {setupDropdownLinks(courseId, gdriveFolderId, otherLinks)
                // tslint:disable-next-line:no-shadowed-variable
                .map(({ name, href }: HomePageLink) => (
                  <Dropdown.Item
                    key={name}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </DropdownButton>
        ))} */}
        {/* TODO add this back after adding fall courses */}
        {/* <div className='divider' /> */}
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
