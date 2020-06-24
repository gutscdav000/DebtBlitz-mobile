import * as actionTypes from '../Actions';

const initialState = {
    debts: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DEBTS_REQUESTED:
            return {
                loading: true,
                debts: [],
            };
        case actionTypes.DEBTS_RECEIVED:
            return {
                ...state,
                loading: false,
                debts: action.debts
            };
        case actionTypes.DEBTS_ERROR:
            // TODO... error handling
            console.log('debts error');
            console.log(action.error);
            return {
                ...state
            }
        default:
            return state;
    }
};

export default reducer;