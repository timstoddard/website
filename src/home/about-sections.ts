export interface Detail {
  field: string
  value: string
}

export interface Section {
  title: string,
  details: Detail[]
}

export const sections: Section[] = [
  {
    title: 'Current Job',
    details: [
      {
        field: 'Company',
        value: 'Amazon',
      },
      {
        field: 'Title',
        value: 'SDE I - Performance Advertising',
      },
      {
        field: 'Dates',
        value: '04/2020 - present',
      },
    ],
  },
  {
    title: 'Previous Position',
    details: [
      {
        field: 'Company',
        value: 'SoCreate',
      },
      {
        field: 'Title',
        value: 'Software Engineering Intern',
      },
      {
        field: 'Dates',
        value: '09/2019 - 12/2019, 02/2016 - 06/2019',
      },
    ],
  },
  {
    title: 'Previous Position',
    details: [
      {
        field: 'Company',
        value: 'Amazon Web Services (AWS)',
      },
      {
        field: 'Title',
        value: 'SDE Intern',
      },
      {
        field: 'Dates',
        value: '06/2019 - 09/2019',
      },
    ],
  },
  {
    title: 'Education',
    details: [
      {
        field: 'University',
        value: 'Cal Poly SLO (graduated 2019)',
      },
      {
        field: 'Major',
        value: 'Computer Science',
      },
      {
        field: 'Minor',
        value: 'Entrepreneurship',
      },
    ],
  },
  {
    title: 'Other',
    details: [
      {
        field: 'Skills',
        value: 'Angular, React, Typescript, Node.js, Java, Python, SQL, C++',
      },
      {
        field: 'Hobbies',
        value: 'Cars, lifting weights, Netflix',
      },
    ],
  },
]
