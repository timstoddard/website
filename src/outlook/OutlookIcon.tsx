import * as React from 'react'

interface OutlookIconProps {
  className: string
}

const EmailIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 14 14'
    className={className}>
    <g>
      <g>
        {/* tslint:disable-next-line:max-line-length */}
        <path d='M7,9L5.268,7.484l-4.952,4.245C0.496,11.896,0.739,12,1.007,12h11.986 c0.267,0,0.509-0.104,0.688-0.271L8.732,7.484L7,9z' />
        {/* tslint:disable-next-line:max-line-length */}
        <path d='M13.684,2.271C13.504,2.103,13.262,2,12.993,2H1.007C0.74,2,0.498,2.104,0.318,2.273L7,8 L13.684,2.271z' />
        <polygon points='0,2.878 0,11.186 4.833,7.079' />
        <polygon points='9.167,7.079 14,11.186 14,2.875' />
      </g>
    </g>
  </svg>
)

const PrinterIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 482.5 482.5'
    className={className}>
    <g>
      <g>
        {/* tslint:disable-next-line:max-line-length */}
        <path d='M399.25,98.9h-12.4V71.3c0-39.3-32-71.3-71.3-71.3h-149.7c-39.3,0-71.3,32-71.3,71.3v27.6h-11.3 c-39.3,0-71.3,32-71.3,71.3v115c0,39.3,32,71.3,71.3,71.3h11.2v90.4c0,19.6,16,35.6,35.6,35.6h221.1c19.6,0,35.6-16,35.6-35.6 v-90.4h12.5c39.3,0,71.3-32,71.3-71.3v-115C470.55,130.9,438.55,98.9,399.25,98.9z M121.45,71.3c0-24.4,19.9-44.3,44.3-44.3h149.6 c24.4,0,44.3,19.9,44.3,44.3v27.6h-238.2V71.3z M359.75,447.1c0,4.7-3.9,8.6-8.6,8.6h-221.1c-4.7,0-8.6-3.9-8.6-8.6V298h238.3 V447.1z M443.55,285.3c0,24.4-19.9,44.3-44.3,44.3h-12.4V298h17.8c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-330 c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h19.9v31.6h-11.3c-24.4,0-44.3-19.9-44.3-44.3v-115c0-24.4,19.9-44.3,44.3-44.3h316 c24.4,0,44.3,19.9,44.3,44.3V285.3z' />
        {/* tslint:disable-next-line:max-line-length */}
        <path d='M154.15,364.4h171.9c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-171.9c-7.5,0-13.5,6-13.5,13.5S146.75,364.4,154.15,364.4 z' />
        {/* tslint:disable-next-line:max-line-length */}
        <path d='M327.15,392.6h-172c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h171.9c7.5,0,13.5-6,13.5-13.5S334.55,392.6,327.15,392.6z' />
        {/* tslint:disable-next-line:max-line-length */}
        <path d='M398.95,151.9h-27.4c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h27.4c7.5,0,13.5-6,13.5-13.5S406.45,151.9,398.95,151.9z' />
      </g>
    </g>
  </svg>
)

const SaveIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 49 49'
    className={className}>
    <g>
      {/* tslint:disable-next-line:max-line-length */}
      <path d='M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5
        V2h7v16h28V2h1.586L46.5,9.414V47z' />
      <path d='M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z' />
      <path d='M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z' />
      {/* tslint:disable-next-line:max-line-length */}
      <path d='M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37 c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z' />
      <path d='M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z' />
    </g>
  </svg>
)

const BackIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512.001 512.001'
    className={className}>
    <g>
      {/* tslint:disable-next-line:max-line-length */}
      <path d='M384.834,180.699c-0.698,0-348.733,0-348.733,0l73.326-82.187c4.755-5.33,4.289-13.505-1.041-18.26 c-5.328-4.754-13.505-4.29-18.26,1.041l-82.582,92.56c-10.059,11.278-10.058,28.282,0.001,39.557l82.582,92.561 c2.556,2.865,6.097,4.323,9.654,4.323c3.064,0,6.139-1.083,8.606-3.282c5.33-4.755,5.795-12.93,1.041-18.26l-73.326-82.188 c0,0,348.034,0,348.733,0c55.858,0,101.3,45.444,101.3,101.3s-45.443,101.3-101.3,101.3h-61.58 c-7.143,0-12.933,5.791-12.933,12.933c0,7.142,5.79,12.933,12.933,12.933h61.58c70.12,0,127.166-57.046,127.166-127.166 C512,237.745,454.954,180.699,384.834,180.699z' />
    </g>
  </svg>
)

const MagnifyingGlassIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    className={className}>
    <g>
      {/* tslint:disable-next-line:max-line-length */}
      <path d='M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z' />
    </g>
  </svg>
)

const TrashCanIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-40 0 427 427.00131'
    className={className}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d='m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0' />
    {/* tslint:disable-next-line:max-line-length */}
    <path d='m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0' />
    {/* tslint:disable-next-line:max-line-length */}
    <path d='m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0' />
    {/* tslint:disable-next-line:max-line-length */}
    <path d='m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0' />
  </svg>
)

const FlagIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 60 60'
    className={className}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d='M44.18,20l9.668-15.47c0.193-0.309,0.203-0.697,0.027-1.015C53.698,3.197,53.363,3,53,3H8V1c0-0.553-0.447-1-1-1 S6,0.447,6,1v3v29v3v23c0,0.553,0.447,1,1,1s1-0.447,1-1V37h45c0.363,0,0.698-0.197,0.875-0.516 c0.176-0.317,0.166-0.706-0.027-1.015L44.18,20z M8,35v-2V5h43.195l-9.043,14.47c-0.203,0.324-0.203,0.736,0,1.061L51.195,35H8z' />
  </svg>
)

const DownChevronIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 30 30'
    className={className}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d='M3,12v-2c0-0.386,0.223-0.738,0.572-0.904s0.762-0.115,1.062,0.13L15,17.708l10.367-8.482 c0.299-0.245,0.712-0.295,1.062-0.13C26.779,9.261,27,9.614,27,10v2c0,0.3-0.135,0.584-0.367,0.774l-11,9 c-0.369,0.301-0.898,0.301-1.267,0l-11-9C3.135,12.584,3,12.3,3,12z' />
  </svg>
)

const FolderIcon = ({ className }: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 60 60'
    className={className}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d='M56.98,11.5H28.02V6.52c0-1.665-1.354-3.02-3.02-3.02H3.02C1.354,3.5,0,4.854,0,6.52V20.5v2v30.98 c0,1.665,1.354,3.02,3.02,3.02H56.98c1.665,0,3.02-1.354,3.02-3.02V22.5v-2v-5.98C60,12.854,58.646,11.5,56.98,11.5z M58,53.48 c0,0.563-0.457,1.02-1.02,1.02H3.02C2.457,54.5,2,54.043,2,53.48V22.5h56V53.48z M2,20.5V6.52C2,5.957,2.457,5.5,3.02,5.5H25 c0.562,0,1.02,0.457,1.02,1.02v6.98H56.98c0.563,0,1.02,0.457,1.02,1.02v5.98H2z' />
</svg>
)

const DownArrowIcon = ({ className}: OutlookIconProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 21.825 21.825'
    className={className}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d='M16.791,13.254c0.444-0.444,1.143-0.444,1.587,0c0.429,0.444,0.429,1.143,0,1.587l-6.65,6.651 c-0.206,0.206-0.492,0.333-0.809,0.333c-0.317,0-0.603-0.127-0.81-0.333l-6.65-6.651c-0.444-0.444-0.444-1.143,0-1.587 s1.143-0.444,1.587,0l4.746,4.762V1.111C9.791,0.492,10.299,0,10.918,0c0.619,0,1.111,0.492,1.111,1.111v16.904L16.791,13.254z' />
  </svg>
)

export enum OutlookIconName {
  BACK_ARROW,
  DOWN_ARROW,
  DOWN_CHEVRON,
  EMAIL,
  FLAG,
  FOLDER,
  MAGNIFYING_GLASS,
  PRINTER,
  SAVE,
  TRASH_CAN,
}

interface Props {
  iconName: OutlookIconName
  className?: string
}

export default class OutlookIcon extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {
      iconName,
      className,
    } = this.props
    switch (iconName) {
      case OutlookIconName.BACK_ARROW:
        return <BackIcon className={className} />
      case OutlookIconName.DOWN_ARROW:
        return <DownArrowIcon className={className} />
      case OutlookIconName.DOWN_CHEVRON:
        return <DownChevronIcon className={className} />
      case OutlookIconName.EMAIL:
        return <EmailIcon className={className} />
      case OutlookIconName.FLAG:
        return <FlagIcon className={className} />
      case OutlookIconName.FOLDER:
        return <FolderIcon className={className} />
      case OutlookIconName.MAGNIFYING_GLASS:
        return <MagnifyingGlassIcon className={className} />
      case OutlookIconName.PRINTER:
        return <PrinterIcon className={className} />
      case OutlookIconName.SAVE:
        return <SaveIcon className={className} />
      case OutlookIconName.TRASH_CAN:
        return <TrashCanIcon className={className} />
    }
  }
}
