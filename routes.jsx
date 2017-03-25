// react stuff
import React from 'react'
import { Route, IndexRoute } from 'react-router'

// general stuff
import { NotFoundWithProps } from './src/NotFound'

// homepage
import Home from './src/home/Home'
import About from './src/home/About'

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
import { Bingo, Heap, Imports, Projects, ProjectsHome, StrobeWithProps, Time, Zen } from './src/projects'

// start page
import Start from './src/start/Start'

const Routes = (
  <Route path="">
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/start" component={Start} />
    <Route path="/lc3" component={LC3}>
      <IndexRoute component={LC3Home} />
      <Route path="/lc3/ref" component={LC3Ref} />
      <Route path="/lc3/sim" component={LC3Sim} />
      <Route path="/lc3/tables" component={LC3Tables}>
        <Route path="/lc3/tables/assembler-directives" component={AssemblerDirectives} />
        <Route path="/lc3/tables/trap-service-routines" component={TrapServiceRoutines} />
        <Route path="/lc3/tables/device-register-assignments" component={DeviceRegisterAssignments} />
        <Route path="/lc3/tables/memory-map" component={MemoryMap} />
      </Route>
      <Route path="/lc3/*" component={NotFoundWithProps('/lc3', 'the LC3 homepage')} />
    </Route>
    <Route path="/projects" component={Projects}>
      <IndexRoute component={ProjectsHome} />
      <Route path="/projects/bingo" component={Bingo} />
      <Route path="/projects/heap" component={Heap} />
      <Route path="/projects/imports" component={Imports} />
      <Route path="/projects/strobe" component={StrobeWithProps(false)} />
      <Route path="/projects/time" component={Time} />
      <Route path="/projects/zen" component={Zen} />
      <Route path="/projects/*" component={NotFoundWithProps('/projects', 'the projects homepage')} />
    </Route>
    <Route path="/strobe-full" component={StrobeWithProps(true)} />
    <Route path="/*" component={NotFoundWithProps('', 'the homepage')} />
  </Route>)

export default Routes
