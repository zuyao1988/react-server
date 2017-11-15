import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';



//all the reducer; initial state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//1. root component - 2. where attempt to render in ReactDOM
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log("stripe key:", process.env.REACT_APP_STRIPE_KEY);
console.log("Environment is:", process.env.NODE_ENV);
