import * as APIUtil from '../util/session_api_util';
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';


const receiveCurrentUser = (currentUser) => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser
    }
}

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    }
}

const receiveErrors = (errors) => {
    return {
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
}
 

export const removeErrors = () => {
    return {
        type: REMOVE_SESSION_ERRORS,
    }
}


// THUNK ACTION


export const signup = (user) => dispatch => {
        APIUtil.signup(user)
            .then(user => {
                return (dispatch(receiveCurrentUser(user)))
            }, err => {
                return (dispatch(receiveErrors(err.responseJSON)))   
            } 
    )
};
    
    
export const login = user => dispatch => (
    APIUtil.login(user)
    .then(user => {
        return (dispatch(receiveCurrentUser(user)))
    }, err => {
        return (dispatch(receiveErrors(err.responseJSON)))    
    }
    )
);


export const logout = () => dispatch => {
    return (
        APIUtil.logout()
            .then( user => dispatch(logoutCurrentUser()))   
    )
};