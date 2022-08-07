import actionNames from '@navdeep/utils/actionNames';

const initialState = {}

export const currentSongReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.CURRENT_SONG_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}