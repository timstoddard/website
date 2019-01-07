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
    name: 'ENGR 464',
    fullName: 'Interdisciplinary Entrepreneurial Senior Design Project II',
    id: -1,
    gdriveFolderId: '1SYEy35nfU65TqwZsAKS-jYEoXecOAivS',
    otherLinks: [
      {
        name: 'LaunchBoard',
        href: 'https://dashboard.launchboard.io/teams/7d344cc2-ced5-4681-8461-c67a0c67b3d7',
      },
    ],
  },
  {
    name: 'CPE 321',
    fullName: 'Introduction to Computer Security',
    id: 12792,
    gdriveFolderId: '1urC_Ngyf6EaR0lE8SAhKm_0wVnV-URav',
  },
  {
    name: 'CSC 436',
    fullName: 'Mobile Application Development',
    id: -1,
    gdriveFolderId: '1opKR2hxful3qD9AvGSCBRDzteGq7Nt7v',
  },
  {
    name: 'CSC 445',
    fullName: 'Computational Theory',
    id: -1,
    gdriveFolderId: '1aPjdNMIfHkoPUnzcD3I2X3UfARQUF7mf',
  },
]

export default courses
