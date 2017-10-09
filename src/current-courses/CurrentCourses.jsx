import React from 'react'

import courses from '../courses'

const CurrentCourses = () =>
  <div className="currentCourses">
    <div className="currentCourses__content">
      <div className="currentCourses__header">Tim&rsquo;s Current Courses</div>
      <div className="currentCourses__divider" />
      <div>
        {courses.map(({ id, name, fullName }) =>
          <div
            key={id}
            className="currentCourses__course">
            {name}: {fullName}
          </div>)}
      </div>
    </div>
  </div>

export default CurrentCourses
