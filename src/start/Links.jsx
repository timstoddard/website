import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import courses from '../_shared/courses'

const SidebarLink = ({ inDropdown, href, name }) => (
  <a
    className={`black-text ${inDropdown ? '' : 'links__collectionItem collection-item'}`}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
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

const setupDropdownLinks = (courseId, gdriveFolderId, otherLinks) => {
  const dropdownItems = []
  if (courseId > 0) {
    dropdownItems.push(
      {
        name: 'Home',
        href: `https://polylearn.calpoly.edu/AY_2017-2018/course/view.php?id=${courseId}`,
      },
      {
        name: 'Grades',
        href: `https://polylearn.calpoly.edu/AY_2017-2018/grade/report/user/index.php?id=${courseId}`,
      }
    )
  }
  dropdownItems.push({
    name: 'Drive',
    href: `https://drive.google.com/drive/folders/${gdriveFolderId}`,
  })
  otherLinks.forEach(({ name, href }) => {
    dropdownItems.push({ name, href })
  })
  return dropdownItems
}

const Dropdown = ({ courseId, index, gdriveFolderId, otherLinks }) => (
  <ul
    id={`dropdown${index}`}
    className="dropdown-content">
    {setupDropdownLinks(courseId, gdriveFolderId, otherLinks)
      .map(({ name, href }) => (
        <li key={href}>
          <SidebarLink
            name={name}
            href={href}
            inDropdown={true}
            />
        </li>
      ))}
  </ul>
)

Dropdown.propTypes = {
  courseId: PropTypes.number,
  index: PropTypes.number.isRequired,
  gdriveFolderId: PropTypes.string.isRequired,
  otherLinks: PropTypes.arrayOf(PropTypes.object),
}

Dropdown.defaultProps = {
  courseId: 0,
  otherLinks: [],
}

const DropdownActivator = ({ index, courseName }) => (
  <a
    className="links__collectionItem collection-item dropdown-button black-text"
    data-activates={`dropdown${index}`}>
    {courseName}
  </a>
)

DropdownActivator.propTypes = {
  courseName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

const links = [
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
    href: 'https://my.calpoly.edu/cas/login?service=https://cmsweb.calpoly.edu/psp/HSLOPRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER%26IsFolder=false%26IgnoreParamTempl=FolderPath%2cIsFolder%26RL=%26target=main0%26navc=2398?clg=login%26languageCd=ENG%26userid=PS%26pwd=z',
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
    name: '17-18 Calendar',
    href: 'http://registrar.calpoly.edu/2017-18-academic-calendar',
  },
  {
    name: 'Floor Plans',
    href: 'https://afd.calpoly.edu/facilities/maps_floorplans.asp',
  },
  {
    name: 'Cal Poly Links',
    href: 'https://my.calpoly.edu/cas/limitedLayout',
  },
]

export default class Links extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.dropdown-button').dropdown()
  }

  render() {
    const { className } = this.props
    return (
      <div className={`links__collection collection ${className}`}>
        {courses.map(({ id, gdriveFolderId, otherLinks, isCalPolyCourse }, index) => (
          <Dropdown
            key={gdriveFolderId}
            index={index}
            courseId={id}
            gdriveFolderId={gdriveFolderId}
            otherLinks={otherLinks}
            />
        ))}
        {courses.map(({ name }, index) => (
          <DropdownActivator
            key={name}
            index={index}
            courseName={name}
            />
        ))}
        <div className="divider" />
        <Link
          className="links__collectionItem collection-item black-text"
          to="">
          Home
        </Link>
        {links.map(({ name, href }) => (
          <SidebarLink
            key={name}
            name={name}
            href={href}
            />
        ))}
      </div>
    )
  }
}

Links.propTypes = {
  className: PropTypes.string.isRequired,
}
