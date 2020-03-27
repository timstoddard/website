import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  destination: string
  to: string
}

const NotFound: React.StatelessComponent<Props> = ({ destination, to }: Props): JSX.Element => {
  document.title = 'Page Not Found'
  return (
    <div className='notFound'>
      <h4>The page you&rsquo;re looking for does not exist.</h4>
      <h4>
        <Link
          className='notFound__link'
          to={to}>
          Click here to go to {destination}.
        </Link>
      </h4>
      <img
        src='https://http.cat/404'
        alt='Page Not Found' />
    </div>
  )
}

export default NotFound
