//import Redux from 'redux';
import applicationReducer from './applicationReducer';
var Redux = require('redux');
module.exports = Redux.combineReducers({
    applicationState: applicationReducer
});