import actionNames from '@navdeep/utils/actionNames';

const initialState = {}

export const dynamicLinkReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.DYNAMIC_LINK_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}