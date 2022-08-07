import actionNames from '@navdeep/utils/actionNames';

const initialState = {}

export const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.AUTH_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}