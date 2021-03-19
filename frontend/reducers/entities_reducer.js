import { combineReducers } from 'redux';
import userReducer from './users_reducer'
import clipsReducer from './clips_reducer'


const entitiesReducer = combineReducers({
  users: userReducer,
  clips: clipsReducer
  
});

export default entitiesReducer;