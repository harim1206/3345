import { combineReducers } from 'redux';
import libraryReducer from './libraryReducer'
import navReducer from './navReducer'
import playlistTitlesContainerReducer from './playlistTitlesContainerReducer'



export default combineReducers({
  library: libraryReducer,
  nav: navReducer,
  playlistTitlesContainer: playlistTitlesContainerReducer

})
