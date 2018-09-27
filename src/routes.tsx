import * as React from 'react'
import * as Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import LoadingPage from './loading-page/LoadingPage'
import NotFound from './not-found/NotFound'

interface LoadableRoute {
  path: string
  loader: () => Promise<any>
}

const routes: LoadableRoute[] = [
  {
    path: '/',
    loader: (): Promise<any> => import('./home/Home'),
  },
  {
    path: '/about',
    loader: (): Promise<any> => import('./home/About'),
  },
  {
    path: '/battery',
    loader: (): Promise<any> => import('./battery/Battery'),
  },
  {
    path: '/bingo',
    loader: (): Promise<any> => import('./bingo/Bingo'),
  },
  {
    path: '/courses',
    loader: (): Promise<any> => import('./current-courses/CurrentCourses'),
  },
  {
    path: '/e85',
    loader: (): Promise<any> => import('./e85/E85'),
  },
  {
    path: '/flicker',
    loader: (): Promise<any> => import('./flicker/Flicker'),
  },
  {
    path: '/heap',
    loader: (): Promise<any> => import('./heap/Heap'),
  },
  {
    path: '/imports',
    loader: (): Promise<any> => import('./imports/Imports'),
  },
  {
    path: '/incr-game',
    loader: (): Promise<any> => import('./incr-game/IncrGame'),
  },
  {
    path: '/infinity',
    loader: (): Promise<any> => import('./infinity/Infinity'),
  },
  {
    path: '/perf',
    loader: (): Promise<any> => import('./perf/Perf'),
  },
  {
    path: '/projects',
    loader: (): Promise<any> => import('./projects/Projects'),
  },
  {
    path: '/rice-purity-test',
    loader: (): Promise<any> => import('./rice-purity-test/RicePurityTest'),
  },
  {
    path: '/start',
    loader: (): Promise<any> => import('./start/Start'),
  },
  {
    path: '/strobe',
    loader: (): Promise<any> => import('./strobe/Strobe'),
  },
  {
    path: '/todo',
    loader: (): Promise<any> => import('./todo/TodoList'),
  },
  {
    path: '/trippy',
    loader: (): Promise<any> => import('./trippy/Trippy'),
  },
  {
    path: '/time',
    loader: (): Promise<any> => import('./time/Time'),
  },
  {
    path: '/zen',
    loader: (): Promise<any> => import('./zen/Zen'),
  },
]

const Routes = (
  <Switch>
    {routes.map(({ path, loader }: LoadableRoute) => (
      <Route
        key={path}
        exact={true}
        path={path}
        component={
          Loadable({
            loader,
            loading: LoadingPage,
            delay: 1000, // 1 second
            timeout: 5000, // 5 seconds
          } as Loadable.OptionsWithoutRender<any>)
        } />
    ))}
    {/* {LC3Routes} */}
    <Route
      path='/*'
      component={(): JSX.Element => (
        <NotFound
          to=''
          destination='the homepage' />
      )} />
  </Switch>
)

export default Routes
