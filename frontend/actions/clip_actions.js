import * as APIUtil from '../util/clip_api_util'
export const RECEIVE_CLIP = 'RECEIVE_CLIP';
export const RECEIVE_CLIPS = 'RECEIVE_CLIPS';

export const receiveClip = (clip) => {
    return {
        type: RECEIVE_CLIP,
        clip
    }
}

export const receiveClips = (clips) => {
    return {
        type: RECEIVE_CLIPS,
        clips
    }
}

// THUNK ACTION

export const fetchClip = (clipId) => dispatch => {
    return(
        APIUtil.fetchClip(clipId)
            .then(clip => {
                return (dispatch(receiveClip(clip)))
            })
    )
}

export const fetchClips = () => dispatch => {
    return (
        APIUtil.fetchClips()
            .then((clips) => {
                return (dispatch(receiveClips(clips)))
            })
    )
}

export const postClip = (formData) => dispatch => {
    return (
        APIUtil.postClip(formData)
            .then((clip) => {
                return (dispatch(receiveClip(clip)))
            })
    )
}
