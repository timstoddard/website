import * as React from 'react'

import courses, { Course } from '../_shared/courses'

const CurrentCourses: React.StatelessComponent<{}> = (): JSX.Element => (
  <div className='currentCourses'>
    <div className='currentCourses__content'>
      <div className='currentCourses__header'>Tim&rsquo;s Current Courses</div>
      <div className='currentCourses__divider' />
      <div>
        {courses.map(({ id, name, fullName }: Course) => (
          <div
            key={id}
            className='currentCourses__course'>
            {name}: {fullName}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default CurrentCourses
