import actionNames from '@navdeep/utils/actionNames';

const initialState = {}

export const recentSearchesReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.RECENT_SEARCHES_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}