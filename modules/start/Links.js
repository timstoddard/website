import React from 'react';
import { Link } from 'react-router';

import './Links.scss';

let SidebarLink = React.createClass({
  propTypes: {
    'inDropdown': React.PropTypes.bool,
    'href': React.PropTypes.string,
    'name': React.PropTypes.string
  },
  render() {
    return <a
      className={`black-text${this.props.inDropdown ? '' : ' links__collectionItem collection-item'}`}
      href={this.props.href}
      target="_blank">
      {this.props.name}
    </a>;
  }
});

let Dropdown = React.createClass({
  propTypes: {
    'courseId': React.PropTypes.number,
    'index': React.PropTypes.number,
    'otherLinks': React.PropTypes.array
  },
  render() {
    let dropdownItems = [
      { name: 'Home', href: `https://polylearn.calpoly.edu/AY_2016-2017/course/view.php?id=${this.props.courseId}` },
      { name: 'Grades', href: `https://polylearn.calpoly.edu/AY_2016-2017/grade/report/user/index.php?id=${this.props.courseId}&userid=128377` }
    ];
    if (this.props.otherLinks) {
      this.props.otherLinks.forEach(link => {
        dropdownItems.push({ name: link.name, href: link.href });
      });
    }
    dropdownItems = dropdownItems.map((dropdownItem, index) => {
      return <li key={index}>
        <SidebarLink name={dropdownItem.name} href={dropdownItem.href} inDropdown={true} />
      </li>;
    });
    return <ul id={`dropdown${this.props.index}`} className="dropdown-content">
      {dropdownItems}
    </ul>;
  }
});

let DropdownActivator = React.createClass({
  propTypes: {
    'courseName': React.PropTypes.string,
    'index': React.PropTypes.number
  },
  render() {
    return <a
      className="links__collectionItem collection-item dropdown-button black-text"
      data-activates={`dropdown${this.props.index}`}>
      {this.props.courseName}
    </a>;
  }
});

export default React.createClass({
  propTypes: {
    'className': React.PropTypes.string
  },
  getInitialState() {
    return {
      courses: [
        {
          name: 'CPE 225',
          id: 1160,
          otherLinks: [
            { name: 'Schedule', href: 'https://users.csc.calpoly.edu/~jplanck/225/225-F2016Schedule.html' }
          ]
        },
        {
          name: 'POLS 112',
          id: 4854
        },
        { name: 'STAT 312', id: 2541 },
        { name: 'ENGL 149', id: 6518 }
      ],
      links: [
        { name: 'Portal', href: 'https://my.calpoly.edu' },
        { name: 'Grades', href: 'https://docs.google.com/spreadsheets/d/1iJBFshNawvpG4JOUBNa9tkxefSHW8a67lVleAWVwH3Y' },
        { name: 'Student Center', href: 'https://my.calpoly.edu/cas/login?service=https://cmsweb.calpoly.edu/psp/HSLOPRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER%26IsFolder=false%26IgnoreParamTempl=FolderPath%2cIsFolder%26RL=%26target=main0%26navc=2398?clg=login%26languageCd=ENG%26userid=PS%26pwd=z' },
        { name: 'Poly Profile', href: 'https://dashboards.calpoly.edu/dw/polydata/student_poly_profile_self_svc.display' },
        { name: 'PASS', href: 'https://pass.calpoly.edu/login.do' },
        { name: 'Poly Planner', href: 'https://polyplanner.calpoly.edu' },
        { name: 'Degree Reqs', href: 'http://catalog.calpoly.edu/collegesandprograms/collegeofengineering/computerscience/bscomputerscience' },
        { name: 'Degree Flowchart', href: 'http://flowcharts.calpoly.edu/downloads/mymap/15-17.52CSCBSU.pdf' },
        { name: 'Cal Poly Links', href: 'https://my.calpoly.edu/cas/limitedLayout' },
        { name: '16-17 Calendar', href: 'http://registrar.calpoly.edu/2016-17-academic-calendar' }
      ]
    };
  },
  componentDidMount() {
    $('.dropdown-button').dropdown();
  },
  render() {
    let dropdowns = [];
    let dropdownActivators = [];
    let links = [<Link className="links__collectionItem collection-item black-text" to="" key="home">Home</Link>];
    this.state.courses.forEach((course, index) => {
      dropdowns.push(<Dropdown key={index} index={index} courseId={course.id} otherLinks={course.otherLinks} />);
      dropdownActivators.push(<DropdownActivator key={index} index={index} courseName={course.name} />);
    });
    this.state.links.forEach((link, index) => {
      links.push(<SidebarLink key={index} name={link.name} href={link.href} />);
    });
    return <div className={`links__collection collection ${this.props.className}`}>
      {dropdowns}
      {dropdownActivators}
      <div className="divider" />
      {links}
    </div>;
  }
});
