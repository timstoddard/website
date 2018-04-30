import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import NotFound from './not-found/NotFound'

const routes = [
  {
    path: '/',
    loader: () => import('./home/Home'),
  },
  {
    path: '/about',
    loader: () => import('./home/About'),
  },
  {
    path: '/battery',
    loader: () => import('./battery/Battery'),
  },
  {
    path: '/bingo',
    loader: () => import('./bingo/Bingo'),
  },
  {
    path: '/courses',
    loader: () => import('./current-courses/CurrentCourses'),
  },
  {
    path: '/e85',
    loader: () => import('./e85/E85'),
  },
  {
    path: '/heap',
    loader: () => import('./heap/Heap'),
  },
  {
    path: '/imports',
    loader: () => import('./imports/Imports'),
  },
  {
    path: '/incr-game',
    loader: () => import('./incr-game/IncrGame'),
  },
  {
    path: '/infinity',
    loader: () => import('./infinity/Infinity'),
  },
  {
    path: '/perf',
    loader: () => import('./perf/Perf'),
  },
  {
    path: '/projects',
    loader: () => import('./projects/Projects'),
  },
  {
    path: '/rice-purity-test',
    loader: () => import('./rice-purity-test/RicePurityTest'),
  },
  {
    path: '/start',
    loader: () => import('./start/Start'),
  },
  {
    path: '/strobe',
    loader: () => import('./strobe/Strobe'),
  },
  {
    path: '/todo',
    loader: () => import('./todo/TodoList'),
  },
  {
    path: '/trippy',
    loader: () => import('./trippy/Trippy'),
  },
  {
    path: '/time',
    loader: () => import('./time/Time'),
  },
  {
    path: '/zen',
    loader: () => import('./zen/Zen'),
  },
]

const Routes = (
  <Switch>
    {routes.map(({ path, loader }) => (
      <Route
        key={path}
        exact={true}
        path={path}
        component={
          Loadable({
            loader,
            loading: () => <div>Loading...</div>
          })
        }
        />
    ))}
    {/* {LC3Routes} */}
    <Route
      path="/*"
      component={() => (
        <NotFound
          to=""
          destination="the homepage"
          />
      )}
      />
  </Switch>
)

export default Routes
