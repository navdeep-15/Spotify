import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { currentSongReducer } from './currentSongReducer';
import { recentSearchesReducer } from './recentSearchesReducer';
import { dynamicLinkReducer } from './dynamicLinkReducer';

const reducers = combineReducers({
    authReducer,
    currentSongReducer,
    recentSearchesReducer,
    dynamicLinkReducer
})

export default reducers;