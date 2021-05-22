import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoadingPage from './loading-page/LoadingPage'
import NotFound from './not-found/NotFound'

interface LoadableRoute {
  path: string
  LazyComponent: React.LazyExoticComponent<React.ComponentType<unknown>>
}

const routes: LoadableRoute[] = [
  {
    path: '/',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Home' */ './home/Home')),
  },
  // {
  //   path: '/2048',
  //   LazyComponent: React.lazy(() => import(/* webpackChunkName: '2048' */ './2048/2048')),
  // },
  {
    path: '/about',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'About' */ './home/About')),
  },
  {
    path: '/battery',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Battery' */ './battery/Battery')),
  },
  {
    path: '/bingo',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Bingo' */ './bingo/Bingo')),
  },
  {
    path: '/dots-black',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'DotsBlack' */ './dots-experiments/DotsBlack')),
  },
  {
    path: '/dots-rs',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'DotsRs' */ './dots-experiments/DotsRs')),
  },
  {
    path: '/dots-xmas',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'DotsXmas' */ './dots-experiments/DotsXmas')),
  },
  {
    path: '/e85',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'E85' */ './e85/E85')),
  },
  {
    path: '/flicker',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Flicker' */ './flicker/Flicker')),
  },
  {
    path: '/heap',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Heap' */ './heap/Heap')),
  },
  {
    path: '/hue',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Hue' */ './hue/Hue')),
  },
  {
    path: '/imports',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Imports' */ './imports/Imports')),
  },
  {
    path: '/incr-game',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'IncrGame' */ './incr-game/IncrGame')),
  },
  {
    path: '/infinity',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Infinity' */ './infinity/Infinity')),
  },
  {
    path: '/light-strips',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'LightStrips' */ './light-strips/LightStrips')),
  },
  {
    path: '/outlook',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Outlook' */ './outlook/Outlook')),
  },
  {
    path: '/perf',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Perf' */ './perf/Perf')),
  },
  {
    path: '/periodic-table',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'PeriodicTable' */ './periodic-table/PeriodicTable')),
  },
  {
    path: '/pride',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Pride' */ './pride/Pride')),
  },
  {
    path: '/projects',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Projects' */ './home/Projects')),
  },
  {
    path: '/rice-purity-test',
    // tslint:disable-next-line:max-line-length
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'RicePurityTest' */ './rice-purity-test/RicePurityTest')),
  },
  {
    path: '/start',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Start' */ './start/Start')),
  },
  {
    path: '/strobe',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Strobe' */ './strobe/Strobe')),
  },
  {
    path: '/text-tools',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'TextTools' */ './text-tools/TextTools')),
  },
  {
    path: '/time',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Time' */ './time/Time')),
  },
  {
    path: '/todo',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'TodoList' */ './todo/TodoList')),
  },
  {
    path: '/trippy',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Trippy' */ './trippy/Trippy')),
  },
  {
    path: '/zen',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Zen' */ './zen/Zen')),
  },
]

const Routes = (
  <Switch>
    {routes.map(({ path, LazyComponent }: LoadableRoute) => (
      <Route
        key={path}
        exact={true}
        path={path}>
        <React.Suspense fallback={<LoadingPage />}>
          <LazyComponent />
        </React.Suspense>
      </Route>
    ))}
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
