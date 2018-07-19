import { combineReducers } from 'redux';
import postReducer from './postReducer'
import libraryReducer from './libraryReducer'

export default combineReducers({
  library: libraryReducer,
  posts: postReducer
})
