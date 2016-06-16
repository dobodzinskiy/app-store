import * as api from '../api/applicationApi';
import * as types from './actionsTypes';

function getAll(data) {
    return {
        type: types.GET_APPLICATIONS,
        applications: data
    }
}
function getApp(data) {
    return {
        type: types.GET_APPLICATION,
        application: data
    }
}
function upload(data) {
    return {
        type: types.UPLOAD_APPLICATION,
        application: data
    }
}
function uploadErrors(data) {
    return {
        type: types.UPLOAD_WITH_ERRORS,
        errors: data
    }
}
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
            data => dispatch(getAll(data)),
            error => alert(error)
        )
    }
}
export function getApplication(id) {
    return function (dispatch) {
        return api.fetchApplication(id).then(
            data => dispatch(getApp(data)),
            error => alert(error)
        )
    }
}
export function uploadApplication(data) {
    return function (dispatch) {
        return api.uploadApplication(data).then(
            data => dispatch(upload(data)),
            data => dispatch(uploadErrors(data))
        )
    }
}
export function downloadApplication(id) {
    api.downloadApplication(id).then(
        data => {
        },
        error => alert(error)
    )
}