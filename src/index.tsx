import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'

render(
  <BrowserRouter key={new Date().valueOf()}>
    {Routes}
  </BrowserRouter>,
  document.getElementById('app'))
