import * as types from '../actions/actionsTypes';

const initialState = {
    topApplications: [],
    applications: [],
    application: []
};

module.exports = function (state = initialState, action) {
    switch (action.type) {
        case types.GET_APPLICATIONS:
            return Object.assign({}, state, {
                applications: action.applications
            });
        case types.GET_TOP_APPLICATIONS:
            return Object.assign({}, state, {
                topApplications: action.applications
            });
        default:
            return state;
    }
};