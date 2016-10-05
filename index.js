// react stuff
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// general stuff
import NotFound from './modules/NotFound';
import './index.scss';

// homepage
import Home from './modules/home/Home';
import About from './modules/home/About';
import Resume from './modules/home/Resume';

// LC3 reference
import LC3Ref from './modules/lc3/LC3Ref';

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

render(<Router history={browserHistory}>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/resume" component={Resume} />
  <Route path="/start" component={Start} />
  <Route path="/lc3" component={LC3Ref} />
  <Route path="/projects" component={Projects}>
    <IndexRoute component={ProjectsHome} />
    <Route path="/projects/bingo" component={Bingo} />
    <Route path="/projects/heap" component={Heap} />
    <Route path="/projects/imports" component={Imports} />
    <Route path="/projects/strobe" component={Strobe} />
    <Route path="/projects/time" component={Time} />
    <Route path="/projects/zen" component={Zen} />
  </Route>
  <Route path="*" component={NotFound} />
</Router>, document.getElementById('app'));
