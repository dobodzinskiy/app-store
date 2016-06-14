//import Redux from 'redux';
import applicationReducer from './applicationReducer';
import profileReducer from './profileReducer';

var Redux = require('redux');
module.exports = Redux.combineReducers({
    applicationState: applicationReducer,
    profileState: profileReducer
});