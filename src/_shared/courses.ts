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
    id: 7814,
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
    name: 'CSC 445',
    fullName: 'Computational Theory',
    id: -1,
    gdriveFolderId: '1aPjdNMIfHkoPUnzcD3I2X3UfARQUF7mf',
    otherLinks: [
      {
        name: 'Textbook',
        // tslint:disable-next-line:max-line-length
        href: 'https://theswissbay.ch/pdf/Book/Introduction%20to%20the%20theory%20of%20computation_third%20edition%20-%20Michael%20Sipser.pdf',
      },
    ],
  },
]

export default courses
