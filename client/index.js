import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Faq from './components/Faq';
import Checker from './components/Checker';
import Player from './components/Player';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

require('es6-promise').polyfill();
require('isomorphic-fetch');

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="faq" component={Faq} />
      <Route path="checker" component={Checker} />
      <Route path="player" component={Player} />
    </Route>
  </Router>
  , document.getElementById('root'));
