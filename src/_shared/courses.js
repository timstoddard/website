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
    name: 'CSC 431',
    fullName: 'Programming Languages II',
    gdriveFolderId: '19vltdfT5VuDfAQVHK00t_NEKRkN4vrju',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://www.brinckerhoff.org/clements/2184-csc431',
      },
      {
        name: 'Piazza',
        href: 'https://piazza.com/class/jffpdfgal32gr',
      },
    ],
  },
  {
    id: 21438,
    name: 'BUS 389',
    fullName: 'Introduction to Business Negotiation for Entrepreneurs',
    gdriveFolderId: '1LxoXrFxvgHMbqKL0EtnH2e1FftIl-Ngp',
  },
  {
    id: -2,
    name: 'PSYC 49',
    fullName: 'Human Sexuality',
    gdriveFolderId: '1HWg1Qv0sr3mfk1xZHvhTvNYPUM2Y3Ua1',
    otherLinks: [
      {
        name: 'Course Home',
        href: 'https://foothillcollege.instructure.com/courses/6400/modules',
      },
    ],
  },
]

export default courses
