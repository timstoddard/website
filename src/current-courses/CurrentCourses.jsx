import React from 'react'

import courses from '../courses'

const CurrentCourses = () =>
  <div className="currentCourses">
    <div className="currentCourses__content">
      <div className="currentCourses__header">Tim&apos;s Current Courses</div>
      <div className="currentCourses__divider" />
      <div>
        {courses.map(course =>
          <div
            key={course.id}
            className="currentCourses__course">
            {course.name}: {course.fullName}
          </div>)}
      </div>
    </div>
  </div>

export default CurrentCourses
