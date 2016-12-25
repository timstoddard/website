// react stuff
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// general stuff
import { NotFoundWithProps } from './modules/NotFound';
import './index.scss';

// homepage
import Home from './modules/home/Home';
import About from './modules/home/About';
import Resume from './modules/home/Resume';

// LC3 reference
import LC3 from './modules/lc3/LC3';
import LC3Home from './modules/lc3/LC3Home';
import LC3Ref from './modules/lc3/ref/LC3Ref';
import LC3Sim from './modules/lc3/sim/LC3Sim';
import LC3Tables from './modules/lc3/tables/LC3Tables';
import AssemblerDirectives from './modules/lc3/tables/AssemblerDirectives';
import TrapServiceRoutines from './modules/lc3/tables/TrapServiceRoutines';
import DeviceRegisterAssignments from './modules/lc3/tables/DeviceRegisterAssignments';
import MemoryMap from './modules/lc3/tables/MemoryMap';

// projects
import { Bingo, Heap, Imports, Projects, ProjectsHome, Strobe, StrobeWithProps, Time, Zen } from './modules/projects';

// start page
import Start from './modules/start/Start';

let App = <Router history={browserHistory}>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/resume" component={Resume} />
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
  <Route path="*" component={NotFoundWithProps('', 'the homepage')} />
</Router>;

render(App, document.getElementById('app'));
