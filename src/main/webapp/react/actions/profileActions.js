import * as api from '../api/profileApi';
import * as types from './actionsTypes';
import { hashHistory } from 'react-router';

export function showLogin() {
    return {
        type: types.SHOW_LOGIN
    }
}
export function showSignUp() {
    return {
        type: types.SHOW_SIGN_UP
    }
}
export function login(user) {
    return function (dispatch) {
        return api.login(user).then(
            data => {
                api.getDownloads().then(
                    data => dispatch({
                        type: types.GET_DOWNLOADS,
                        applications: data
                    }),
                    error => alert(error)
                );
                dispatch({
                    type: types.LOGIN,
                    user: data
                })
            },
            error => alert(error)
        )
    }
}
export function logout() {
    return function (dispatch) {
        return api.logout().then(
            () => {
                hashHistory.replace('/');
                dispatch({
                    type: types.LOGOUT
                })
            },
            () => alert('Error while logout occurred!')
        )
    }
}
export function signUp(user) {
    return function (dispatch) {
        return api.signUp(user).then(
            data => {
                hashHistory.replace("/");
                dispatch({
                    type: types.LOGIN,
                    user: data
                })
            },
            error => alert(error)
        )
    }
}
export function updateProfileFromServer() {
    return function (dispatch) {
        return api.updateProfileFromServer().then(
            data => dispatch({
                type: types.GET_PROFILE,
                profile: data
            }),
            error => alert(error)
        )
    }
}
export function getUserApplications() {
    return function(dispatch) {
        return api.getUserApplications().then(
            data => dispatch({
                type: types.GET_PROFILE_APPLICATIONS,
                applications: data
            }),
            error => alert(error)
        )
    }
}
