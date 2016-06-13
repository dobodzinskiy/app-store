import { fetchTopApplications, fetchApplications } from '../api/applicationApi';
import * as types from './actionsTypes';

export function getTop(data) {
    return {
        type: types.GET_TOP_APPLICATIONS,
        applications: data
    }
}
export function getAll(data) {
    return {
        type: types.GET_APPLICATIONS,
        applications: data
    }
}

export function getTopApplications() {
    return function(dispatch) {
        return fetchTopApplications().then(
            data => dispatch(getTop(data)),
            error => alert(error)
        )
    }
}
export function getApplications(type) {
    return function(dispatch) {
        return fetchApplications(type).then(
            data => dispatch(getAll(data)),
            error => alert(error)
        )
    }
}