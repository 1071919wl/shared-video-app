import * as APIUtil from '../util/pusher_api_util'
export const RECEIVE_PUSHER = 'RECEIVE_PUSHER';

export const receivePusher = (push) => {
    return {
        type: RECEIVE_PUSHER,
        push
    }
}


// THUNK ACTION

export const postPusher = (cred) => dispatch => {
    return (
        APIUtil.auth(cred)
            .then((auth) => {
                return (dispatch(receiveClip(auth)))
        })
    )
}
