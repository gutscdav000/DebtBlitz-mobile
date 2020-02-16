import * as actionTypes from '../Actions';

const initialState = {
    accounts: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ACCOUNTS_REQUESTED:
            return {
                loading: true,
                accounts: [],
            };
        case actionTypes.ACCOUNTS_RECEIVED:
            return {
                ...state,
                loading: false,
                data: action.accountData
            };
        case actionTypes.ACCOUNTS_ERROR:
            // TODO... error handling
            console.log(action.error);
            return {
                ...state
            }
        default:
            return state;
    }
};

export default reducer;