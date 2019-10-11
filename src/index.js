import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";

import AwesomeGamified from './containers/awesome-gamified';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AwesomeGamified />
  </Provider>,
  document.getElementById('root'),
);
