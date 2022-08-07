import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { currentSongReducer } from './currentSongReducer';
import { recentSearchesReducer } from './recentSearchesReducer';

const reducers = combineReducers({
    authReducer,
    currentSongReducer,
    recentSearchesReducer
})

export default reducers;