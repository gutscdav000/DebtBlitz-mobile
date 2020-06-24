import * as actionTypes from '../Actions';

const initialState = {
    actions: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ACTIONS_REQUESTED:
            return {
                actions: [],
            };
        case actionTypes.ACTIONS_RECEIVED:
            return {
                ...state,
                actions: action.actions
            };
        case actionTypes.ACTIONS_ERROR:
            // TODO... error handling
            console.log('actions error');
            console.log(action.error);
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;