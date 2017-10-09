// react
import React from 'react'
import { Route, IndexRoute } from 'react-router'

// general
import NotFound from './src/NotFound'

// homepage
import Home from './src/home/Home'
import About from './src/home/About'

// start page
import Start from './src/start/Start'

// LC3 reference
import LC3 from './src/lc3/LC3'
import LC3Home from './src/lc3/LC3Home'
import LC3Ref from './src/lc3/ref/LC3Ref'
import LC3Sim from './src/lc3/sim/LC3Sim'
import LC3Tables from './src/lc3/tables/LC3Tables'
import AssemblerDirectives from './src/lc3/tables/AssemblerDirectives'
import TrapServiceRoutines from './src/lc3/tables/TrapServiceRoutines'
import DeviceRegisterAssignments from './src/lc3/tables/DeviceRegisterAssignments'
import MemoryMap from './src/lc3/tables/MemoryMap'

// projects
import Battery from './src/battery/Battery'
import Bingo from './src/bingo/Bingo'
import CurrentCourses from './src/current-courses/CurrentCourses'
import E85 from './src/e85/E85'
import Heap from './src/heap/Heap'
import Imports from './src/imports/Imports'
import IncrGame from './src/incr-game/IncrGame'
import Infinity from './src/infinity/Infinity'
import Projects from './src/projects/Projects'
import RicePurityTest from './src/rice-purity-test/RicePurityTest'
import Strobe from './src/strobe/Strobe'
import Time from './src/time/Time'
import TodoList from './src/todo/TodoList'
import Trippy from './src/trippy/Trippy'
import Zen from './src/zen/Zen'

const projects = [
  { path: '/battery', component: Battery },
  { path: '/bingo', component: Bingo },
  { path: '/courses', component: CurrentCourses },
  { path: '/e85', component: E85 },
  { path: '/heap', component: Heap },
  { path: '/imports', component: Imports },
  { path: '/incr-game', component: IncrGame },
  { path: '/infinity', component: Infinity },
  { path: '/projects', component: Projects },
  { path: '/rice-purity-test', component: RicePurityTest },
  { path: '/todo', component: TodoList },
  { path: '/trippy', component: Trippy },
  { path: '/strobe', component: Strobe },
  { path: '/time', component: Time },
  { path: '/zen', component: Zen },
]

const Routes = (
  <Route path="">
    <Route
      path="/"
      component={Home}
      />
    <Route
      path="/about"
      component={About}
      />
    <Route
      path="/start"
      component={Start}
      />
    {projects.map((props) => <Route {...props} />)}
    <Route
      path="/lc3"
      component={LC3}>
      <IndexRoute component={LC3Home} />
      <Route
        path="/lc3/ref"
        component={LC3Ref}
        />
      <Route
        path="/lc3/sim"
        component={LC3Sim}
        />
      <Route
        path="/lc3/tables"
        component={LC3Tables}>
        <Route
          path="/lc3/tables/assembler-directives"
          component={AssemblerDirectives}
          />
        <Route
          path="/lc3/tables/trap-service-routines"
          component={TrapServiceRoutines}
          />
        <Route
          path="/lc3/tables/device-register-assignments"
          component={DeviceRegisterAssignments}
          />
        <Route
          path="/lc3/tables/memory-map"
          component={MemoryMap}
          />
      </Route>
      <Route
        path="/lc3/*"
        component={() =>
          <NotFound
            to="/lc3"
            destination="the LC3 homepage"
            />}
        />
    </Route>
    <Route
      path="/*"
      component={() =>
        <NotFound
          to=""
          destination="the homepage"
          />}
      />
  </Route>
)

export default Routes
