/* eslint-disable react/no-children-prop */

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import Routes from './routes'
import './index.scss'

const renderApp = (routes) =>
  render(
    <Router key={new Date()} history={browserHistory} children={routes} />,
    document.getElementById('app'))

renderApp(Routes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const Routes = require('./routes').default
    renderApp(Routes)
  })
}
