import * as actionTypes from '../Actions';

const initialState = {
    bills: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.BILLS_REQUESTED:
            return {
                loading: true,
                bills: [],
            };
        case actionTypes.BILLS_RECEIVED:
            return {
                ...state,
                loading: false,
                data: action.billData
            };
        case actionTypes.BILLS_ERROR:
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