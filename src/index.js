import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import Rater from './rater';
import store from './rater.state';

ReactDOM.render(
  <Provider store={store}>
    <Rater />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();