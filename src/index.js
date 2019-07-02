import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import './index.css';

import AwesomeGamified from './containers/awesome-gamified';

ReactDOM.render(
  <HashRouter>
    <Route exact path='/' component={AwesomeGamified} />
  </HashRouter>,
  document.getElementById('root'),
);
