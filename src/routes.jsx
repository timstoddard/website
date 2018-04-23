// react-router
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// general
import NotFound from '../src/not-found/NotFound'

// homepage
import Home from '../src/home/Home'
import About from '../src/home/About'

// start page
import Start from '../src/start/Start'

// LC3 routes
// import LC3Routes from '../src/lc3/LC3Routes'

// projects
import Battery from '../src/battery/Battery'
import Bingo from '../src/bingo/Bingo'
import CurrentCourses from '../src/current-courses/CurrentCourses'
import E85 from '../src/e85/E85'
import Heap from '../src/heap/Heap'
import Imports from '../src/imports/Imports'
import IncrGame from '../src/incr-game/IncrGame'
import Infinity from '../src/infinity/Infinity'
import Perf from '../src/perf/Perf'
import Projects from '../src/projects/Projects'
import RicePurityTest from '../src/rice-purity-test/RicePurityTest'
import Strobe from '../src/strobe/Strobe'
import Time from '../src/time/Time'
import TodoList from '../src/todo/TodoList'
import Trippy from '../src/trippy/Trippy'
import Zen from '../src/zen/Zen'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/battery', component: Battery },
  { path: '/bingo', component: Bingo },
  { path: '/courses', component: CurrentCourses },
  { path: '/e85', component: E85 },
  { path: '/heap', component: Heap },
  { path: '/imports', component: Imports },
  { path: '/incr-game', component: IncrGame },
  { path: '/infinity', component: Infinity },
  { path: '/perf', component: Perf },
  { path: '/projects', component: Projects },
  { path: '/rice-purity-test', component: RicePurityTest },
  { path: '/start', component: Start },
  { path: '/strobe', component: Strobe },
  { path: '/todo', component: TodoList },
  { path: '/trippy', component: Trippy },
  { path: '/time', component: Time },
  { path: '/zen', component: Zen },
]

const Routes = (
  <Switch>
    {routes.map((props) => (
      <Route
        key={props.path}
        exact={true}
        {...props}
        />)
    )}
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
