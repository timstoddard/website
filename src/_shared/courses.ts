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
    name: 'ENGR 465',
    fullName: 'Interdisciplinary Entrepreneurial Senior Design Project III',
    id: 16056,
    gdriveFolderId: '14exYt6K3KgweH6OfjEF6tP0W3A-hU0iV',
    otherLinks: [
      {
        name: 'LaunchBoard',
        href: 'https://dashboard.launchboard.io/teams/7d344cc2-ced5-4681-8461-c67a0c67b3d7',
      },
    ],
  },
  {
    name: 'CSC 431',
    fullName: 'Programming Languages II',
    id: -1,
    gdriveFolderId: '1mihVveBOFhAIww6zz5XRhbwZmbGRBvKJ',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://www.brinckerhoff.org/clements/2194-csc431',
      },
      {
        name: 'Piazza',
        href: 'https://piazza.com/class/jtzeda5kdq939s',
      },
    ],
  },
  {
    name: 'CSC 466',
    fullName: 'Knowledge Discovery From Data',
    id: 19923,
    gdriveFolderId: '1uibgKGz_cWOTAOP6bs7QkFuNku-php9X',
  },
]

export default courses
