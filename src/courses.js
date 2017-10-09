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
    name: 'CSC 307',
    fullName: 'Intro to Software Engineering',
    id: 7040,
    gdriveFolderId: '0B9dz0Ddcl3ESbnRUSExNQVdBYUE',
  },
  {
    name: 'CSC 349',
    fullName: 'Algorithms',
    id: 5516,
    gdriveFolderId: '0B9dz0Ddcl3ESaHNMcDZ5dTNsLXM',
  },
  {
    name: 'BUS 220',
    fullName: 'Business Basics for Entrepreneurs',
    id: 6470,
    gdriveFolderId: '0B9dz0Ddcl3ESUTRidU9oTXkzV0E',
    otherLinks: [
      {
        name: 'Connect',
        href: 'https://newconnect.mheducation.com/flow/connect.html',
      },
    ],
  },
  {
    name: 'CNET 260',
    fullName: 'Network Fundamentals',
    gdriveFolderId: '0B9dz0Ddcl3ESSXc0emo0WEsxYTQ',
    otherLinks: [
      {
        name: 'Netacad',
        href: 'https://1274739.netacad.com/courses/538100',
      },
      {
        name: 'Cuesta Course',
        href: 'https://cuesta.instructure.com/courses/6521',
      },
    ],
  },
]

export default courses
