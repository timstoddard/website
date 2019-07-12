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
  // TODO update for fall
  // {
  //   name: 'CSC 482',
  //   fullName: 'Natural Language Processing',
  //   id: 16056,
  //   gdriveFolderId: '14exYt6K3KgweH6OfjEF6tP0W3A-hU0iV',
  // },
  // {
  //   name: 'BOT 121',
  //   fullName: 'Botany',
  //   id: 19923,
  //   gdriveFolderId: '1uibgKGz_cWOTAOP6bs7QkFuNku-php9X',
  // },
]

export default courses
