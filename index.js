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

// countdown for Lucas
import Countdown from './modules/countdown/Countdown';

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
import Bingo from './modules/projects/Bingo';
import Heap from './modules/projects/Heap';
import Imports from './modules/projects/Imports';
import Projects from './modules/projects/Projects';
import ProjectsHome from './modules/projects/ProjectsHome';
import Strobe from './modules/projects/Strobe';
import Time from './modules/projects/Time';
import Zen from './modules/projects/Zen';

// start page
import Start from './modules/start/Start';

let App =
<Router history={browserHistory}>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/resume" component={Resume} />
  <Route path="/start" component={Start} />
  <Route path="/countdown" component={Countdown} />
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
    <Route path="/projects/strobe" component={Strobe} />
    <Route path="/projects/time" component={Time} />
    <Route path="/projects/zen" component={Zen} />
    <Route path="/projects/*" component={NotFoundWithProps('/projects', 'the projects homepage')} />
  </Route>
  <Route path="*" component={NotFoundWithProps('', 'the homepage')} />
</Router>;

render(App, document.getElementById('app'));
