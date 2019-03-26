import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

import './index.css';

import Humans from './containers/humans';

ReactDOM.render(
  <HashRouter>
    <Route exact path='/' component={Humans} />
  </HashRouter>,
  document.getElementById('root'),
);
