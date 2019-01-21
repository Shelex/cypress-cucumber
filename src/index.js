import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import persistState from 'redux-localstorage';
import './index.css';
import App from './components/App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import initialData from './const/initialData';

const store = createStore(
  reducers,
  { data: initialData, filters: {} },
  persistState(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
  /* eslint-enable no-undef */
);

// expose store when run in Cypress
// eslint-disable-next-line no-undef
if (window.Cypress) {
  // eslint-disable-next-line no-undef
  window.store = store;
}

registerServiceWorker();
