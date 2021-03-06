import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/reducers/rootReducer'

import * as serviceWorker from './serviceWorker';

import './components/static/css/index.scss';
import './pages/pages.scss'
import App from './components/App'

const start = (store) => 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>  
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

try {
  const store = createStore(rootReducer, compose(
    applyMiddleware( thunk ),
  
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

  start(store)
  serviceWorker.unregister();

} catch (e) {
  const store = createStore(rootReducer, compose(
    applyMiddleware( thunk ),
  
   //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

  start(store)
  
  serviceWorker.unregister();
  
}