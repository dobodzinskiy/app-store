import * as types from '../actions/actionsTypes';

const initialState = {
    topApplications: [],
    applications: [],
    application: [],
    applicationRates: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_APPLICATIONS:
            return Object.assign({}, state, {
                applications: action.applications
            });
        case types.GET_TOP_APPLICATIONS:
            return Object.assign({}, state, {
                topApplications: action.applications
            });
        case types.GET_APPLICATION:
            return Object.assign({}, state, {
                application: action.application
            });
        case types.GET_DOWNLOADS_APP:
            return Object.assign({}, state, {
                applicationRates: action.rates
            });
        case types.RATE_APPLICATION:
            var rates = state.applicationRates.concat(action.rate);
            return Object.assign({}, state, {
                applicationRates: rates
            });
        case types.DOWNLOAD_APPLICATION:
            var newApplication = state.application;
            newApplication.downloads += 1;
            return Object.assign({}, state, {
                application: newApplication
            });
        default:
            return state;
    }
};