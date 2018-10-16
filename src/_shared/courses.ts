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
    id: -1,
    name: 'CSC 453',
    fullName: 'Introduction to Operating Systems',
    gdriveFolderId: '1ftK5GS7Vb31TGWKpDdvSE0l0MkDPpXs-',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://users.csc.calpoly.edu/~pnico/class/2018-04/cpe453',
      },
      {
        name: 'Textbook',
        // tslint:disable-next-line:max-line-length
        href: 'https://mcdtu.files.wordpress.com/2017/03/tanenbaum_woodhull_operating-systems-design-implementation-3rd-edition.pdf',
      },
    ],
  },
  {
    id: 1544,
    name: 'CSC 480',
    fullName: 'Introduction to Artificial Intelligence',
    gdriveFolderId: '1N4cIw2venlmavlGhfmWISUbTLQir0UMQ',
  },
  {
    id: 802,
    name: 'ENGR 463',
    fullName: 'Interdisciplinary Entrepreneurial Senior Design Project I',
    gdriveFolderId: '15aoJYPvtzzQaigftDEiZ7PTlv3WyQj2A',
  },
  {
    id: 3728,
    name: 'BUS 458',
    fullName: 'Solving Big World Challenges',
    gdriveFolderId: '16b06HooS4KpIwWPVf7OK5r8QxIez7JWo',
  },
  {
    id: -2,
    name: 'MDIA 2B',
    fullName: 'History of Film, 1945 - Current',
    gdriveFolderId: '1RNFcOPGWjOdp3mwWsw678-HvpcP0RGd9',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://foothillcollege.instructure.com/courses/7310/modules',
      },
    ],
  },
]

export default courses
