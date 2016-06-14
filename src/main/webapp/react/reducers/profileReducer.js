import * as types from '../actions/actionsTypes';

const initialState = {
    currentUser: null,
    currentUserRole: null,
    isLoginOpen: false,
    isSignUpOpen: false
};
function singleRole(user) {
    if (user == null) {
        return null;
    } else if (user.userRoles.includes('developer')) {
        return 'ROLE_DEVELOPER';
    } else {
        return 'ROLE_USER';
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN :
            return Object.assign({}, state, {
                currentUser: action.user,
                currentUserRole: singleRole(action.user),
                isLoginOpen: false,
                isSignUpOpen: false
            });
        case types.LOGOUT :
            return Object.assign({}, state, {
                currentUser: null,
                currentUserRole: null
            });
        case types.SHOW_LOGIN :
            return Object.assign({}, state, {
                isLoginOpen: !state.isLoginOpen
            });
        case types.SHOW_SIGN_UP :
            return Object.assign({}, state, {
                isSignUpOpen: !state.isSignUpOpen
            });
        default:
            return state;
    }
}