//import Redux from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
//var Redux = require('redux');

export default createStore(reducers, applyMiddleware(thunk));