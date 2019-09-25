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

export interface Course {
  name: string
  fullName: string
  id: number
  gdriveFolderId: string
  otherLinks?: Array<{ name: string, href: string }>
}

const courses: Course[] = [
  {
    name: 'CSC 482',
    fullName: 'Natural Language Processing',
    id: 1564,
    gdriveFolderId: '11NWY4eKCT-jQ2Xp4tu71HxZ3aSplXOdF',
  },
  {
    name: 'CHEM 124',
    fullName: 'General Chemistry I',
    id: 5122,
    gdriveFolderId: '1GQTTPI6tRtg2ItXZJgaVBHmtIeEOamkw',
    otherLinks: [
      {
        name: 'LabPal',
        href: 'https://labpal.atom.calpoly.edu/course/99/landing',
      },
    ],
  },
]

export default courses
