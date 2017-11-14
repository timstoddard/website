// react-router
import React from 'react'
import { Route, IndexRoute } from 'react-router'

// not found route
import NotFound from '../NotFound'

// lc3 components
import LC3 from './LC3'
import LC3Home from './LC3Home'
import LC3Ref from './ref/LC3Ref'
import LC3Sim from './sim/LC3Sim'
import LC3Tables from './tables/LC3Tables'
import AssemblerDirectives from './tables/AssemblerDirectives'
import TrapServiceRoutines from './tables/TrapServiceRoutines'
import DeviceRegisterAssignments from './tables/DeviceRegisterAssignments'
import MemoryMap from './tables/MemoryMap'

const LC3Routes = (
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
)

export default LC3Routes
