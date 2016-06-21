import * as api from '../api/applicationApi';
import * as types from './actionsTypes';

export function getTopApplications() {
    return function (dispatch) {
        return api.fetchTopApplications().then(
            data => dispatch({
                type: types.GET_TOP_APPLICATIONS,
                applications: data
            }),
            error => alert(error)
        )
    }
}
export function getApplications(type) {
    return function (dispatch) {
        return api.fetchApplications(type).then(
            data => dispatch({
                type: types.GET_APPLICATIONS,
                applications: data
            }),
            error => alert(error)
        )
    }
}
export function getApplication(id) {
    return function (dispatch) {
        return api.fetchApplication(id).then(
            data => {
                api.getDownloads(id).then(
                    data => dispatch({
                        type: types.GET_DOWNLOADS_APP,
                        rates: data
                    }),
                    error => alert(error)
                );
                dispatch({
                    type: types.GET_APPLICATION,
                    application: data
                })
            },
            error => alert(error)
        )
    }
}
export function uploadApplication(data) {
    return function (dispatch) {
        return api.uploadApplication(data).then(
            data => dispatch({
                type: types.UPLOAD_APPLICATION,
                application: data
            }),
            data => dispatch({
                type: types.UPLOAD_WITH_ERRORS,
                errors: data
            })
        )
    }
}
export function downloadApplication(id) {
    return function(dispatch) {
        return api.downloadApplication(id);
    }
}