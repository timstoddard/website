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
    name: 'CPE 315',
    fullName: 'Computer Architecture',
    id: 17105,
    gdriveFolderId: '0B9dz0Ddcl3ESQUNPaXRsZjRmczA',
    otherLinks: [
      {
        name: 'MIPS Reference',
        href: 'http://www-inst.eecs.berkeley.edu/~cs61c/resources/MIPS_Green_Sheet.pdf',
      },
      {
        name: 'MIPS Basics',
        href: 'https://www2.engr.arizona.edu/~ece369/Resources/spim/QtSPIM_examples.pdf',
      },
    ],
  },
  {
    name: 'CPE 300',
    fullName: 'Professional Responsibilities',
    id: 14748,
    gdriveFolderId: '0B9dz0Ddcl3ESdDlKTVUyVHJ5VkU',
  },
  {
    name: 'BUS 310',
    fullName: 'Introduction to Entrepreneurship',
    id: 21242,
    gdriveFolderId: '0B9dz0Ddcl3ESU2h1NFlEcEZTUEU',
  },
  {
    name: 'PHIL 231',
    fullName: 'Ethics and Political Philosophy',
    id: 19969,
    gdriveFolderId: '0B9dz0Ddcl3ESWlhQdzUyUENqVTA',
  },
]

export default courses
