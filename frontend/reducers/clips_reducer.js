import {RECEIVE_CLIP, RECEIVE_CLIPS} from '../actions/clip_actions';


const clipsReducer = (state={}, action) => {
    Object.freeze(state);
    const newState = {...state};

    switch(action.type){
        case RECEIVE_CLIP:
            let test =  Object.assign({}, newState, { [action.clip.id]: action.clip });
            return test;
        case RECEIVE_CLIPS:
            return action.clips;
        default:
            return state;    
    }
}

export default clipsReducer;