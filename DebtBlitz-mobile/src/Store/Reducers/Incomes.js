import * as actionTypes from '../Actions';

const initialState = {
    INCOMEs: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INCOMES_REQUESTED:
            return {
                loading: true,
                incomes: [],
            };
        case actionTypes.INCOMES_RECEIVED:
            return {
                ...state,
                loading: false,
                data: action.incomeData
            };
        case actionTypes.INCOMES_ERROR:
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