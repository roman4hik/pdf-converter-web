import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'

import { rootReducer } from './rootReducer'
import App from './components/App'
import sagaWatcher from './components/App/saga'
import * as serviceWorker from './serviceWorker';

const saga = createSagaMiddleware()

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            saga
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

ReactDOM.render(
  <Provider  store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

saga.run(sagaWatcher);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
