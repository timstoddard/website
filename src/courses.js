/*
course structure
{
  name: 'DEPT ###',
  fullName: 'Full Name',
  id: 0000,
  gdriveFolderId: 'abcdefghijklmnopqrstuvwxyz',
  otherLinks: [
    {
      name: 'Link Name',
      href: 'https://href.goes/here'
    }
  ]
}
*/

const courses = [
  {
    id: -1,
    name: 'CSC 430',
    fullName: 'Programming Languages',
    gdriveFolderId: '1h0MOVbxGzzgpKr7H-XVGV89U_muN-RT3',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://www.brinckerhoff.org/clements/2182-csc430',
      },
      {
        name: 'Piazza',
        href: 'https://piazza.com/class/jc5c5jc6v1o43b',
      },
      {
        name: 'Lab Submissions',
        href: 'http://www.brinckerhoff.org:8026/servlets/standalone.rkt',
      },
      {
        name: 'Gradescope',
        href: 'https://gradescope.com/',
      },
    ],
  },
  {
    id: -2,
    name: 'CSC 437',
    fullName: 'Dynamic Web Development',
    gdriveFolderId: '1t9Tfh4QazvyKHpddOzGonV2HLhZOHTiM',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://users.csc.calpoly.edu/~grade-cstaley/WebDev',
      },
      {
        name: 'IHS',
        href: 'https://softwareinventions.com',
      },
    ],
  },
  {
    id: 10128,
    name: 'ENGR 234',
    fullName: 'Introduction to Design Thinking',
    gdriveFolderId: '1OnALhXFaIgj9NHQTeF5e21dV8o4Ti6z-',
  },
  {
    id: 9630,
    name: 'PHIL 322',
    fullName: 'Philosophy of Technology',
    gdriveFolderId: '19VZgO8tsyq4GX8SO4DFzixsKG_AzaJe7',
  },
]

export default courses
