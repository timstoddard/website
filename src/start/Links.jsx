import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import courses from '../courses'

const SidebarLink = ({ inDropdown, href, name }) =>
  <a
    className={`black-text ${inDropdown ? '' : 'links__collectionItem collection-item'}`}
    href={href}
    target="_blank">
    {name}
  </a>

SidebarLink.propTypes = {
  inDropdown: PropTypes.bool,
  href: PropTypes.string,
  name: PropTypes.string
}

const setupDropdownLinks = (courseId, gdriveFolderId, otherLinks) => {
  const dropdownItems = []
  if (courseId) {
    dropdownItems.push(
      {
        name: 'Home',
        href: `https://polylearn.calpoly.edu/AY_2016-2017/course/view.php?id=${courseId}`,
      },
      {
        name: 'Grades',
        href: `https://polylearn.calpoly.edu/AY_2016-2017/grade/report/user/index.php?id=${courseId}&userid=128377`,
      }
    )
  }
  dropdownItems.push({
    name: 'Drive',
    href: `https://drive.google.com/drive/folders/${gdriveFolderId}`
  })
  if (otherLinks) {
    otherLinks.forEach(link => {
      dropdownItems.push({ name: link.name, href: link.href })
    })
  }
  return dropdownItems
}

const Dropdown = ({ courseId, index, gdriveFolderId, otherLinks }) =>
  <ul id={`dropdown${index}`} className="dropdown-content">
    {setupDropdownLinks(courseId, gdriveFolderId, otherLinks)
      .map((dropdownItem, index) =>
        <li key={index}>
          <SidebarLink
            name={dropdownItem.name}
            href={dropdownItem.href}
            inDropdown
            />
        </li>
      )}
  </ul>

Dropdown.propTypes = {
  courseId: PropTypes.number,
  index: PropTypes.number,
  gdriveFolderId: PropTypes.string,
  otherLinks: PropTypes.arrayOf(PropTypes.object)
}

const DropdownActivator = ({ index, courseName }) =>
  <a
    className="links__collectionItem collection-item dropdown-button black-text"
    data-activates={`dropdown${index}`}>
    {courseName}
  </a>

DropdownActivator.propTypes = {
  courseName: PropTypes.string,
  index: PropTypes.number
}

const links = [
  {
    name: 'Portal',
    href: 'https://my.calpoly.edu'
  },
  {
    name: 'Grades',
    href: 'https://docs.google.com/spreadsheets/d/1iJBFshNawvpG4JOUBNa9tkxefSHW8a67lVleAWVwH3Y'
  },
  {
    name: 'Student Center',
    href: 'https://my.calpoly.edu/cas/login?service=https://cmsweb.calpoly.edu/psp/HSLOPRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER%26IsFolder=false%26IgnoreParamTempl=FolderPath%2cIsFolder%26RL=%26target=main0%26navc=2398?clg=login%26languageCd=ENG%26userid=PS%26pwd=z'
  },
  {
    name: 'Poly Profile',
    href: 'https://dashboards.calpoly.edu/dw/polydata/student_poly_profile_self_svc.display'
  },
  {
    name: 'PASS',
    href: 'https://pass.calpoly.edu/login.do'
  },
  {
    name: 'Poly Planner',
    href: 'https://polyplanner.calpoly.edu'
  },
  {
    name: 'Degree Reqs',
    href: 'http://flowcharts.calpoly.edu/downloads/curric/15-17.Computer%20Science.pdf'
  },
  {
    name: 'Degree Flowchart',
    href: 'http://flowcharts.calpoly.edu/downloads/mymap/15-17.52CSCBSU.pdf'
  },
  {
    name: '16-17 Calendar',
    href: 'http://registrar.calpoly.edu/2016-17-academic-calendar'
  },
  {
    name: 'Floor Plans',
    href: 'https://afd.calpoly.edu/facilities/maps_floorplans.asp'
  },
  {
    name: 'Cal Poly Links',
    href: 'https://my.calpoly.edu/cas/limitedLayout'
  },
]

class Links extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.dropdown-button').dropdown()
  }

  render() {
    return (
      <div className={`links__collection collection ${this.props.className}`}>
        {courses.map((course, index) =>
          <Dropdown
            key={index}
            index={index}
            courseId={course.id}
            gdriveFolderId={course.gdriveFolderId}
            otherLinks={course.otherLinks}
            />
        )}
        {courses.map((course, index) =>
          <DropdownActivator
            key={index}
            index={index}
            courseName={course.name}
            />
        )}
        <div className="divider" />
        <Link
          className="links__collectionItem collection-item black-text"
          to="">
          Home
        </Link>
        {links.map((link, index) =>
          <SidebarLink
            key={index}
            name={link.name}
            href={link.href}
            />
        )}
      </div>
    )
  }
}

Links.propTypes = {
  className: PropTypes.string
}

export default Links
