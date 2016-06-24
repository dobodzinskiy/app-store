import * as api from '../api/applicationApi';
import * as types from './actionsTypes';
import * as profileActions from './profileActions';

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
            data => {
                dispatch({
                    type: types.UPLOAD_APPLICATION,
                    application: data
                });
                hashHistory.replace('/' + data.id);
            },
            data => dispatch({
                type: types.UPLOAD_WITH_ERRORS,
                errors: data
            })
        )
    }
}
export function downloadApplication(id) {
    return function(dispatch) {
        dispatch({
            type: types.DOWNLOAD_APPLICATION,
            id
        });

        var download = '/applications/' + id + '/zip';
        var win = window.open(download, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
        profileActions.updateProfileFromServer();
    }
}
export function rateApplication(rating) {
    return function(dispatch) {
        return api.rateApplication(rating).then(
            data => dispatch({
                type: types.RATE_APPLICATION,
                rate: data
            }),
            error => alert(error)
        )
    }
}