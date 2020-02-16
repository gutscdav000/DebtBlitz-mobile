import * as actionTypes from '../Actions';

const initialState = {
    isAuthenticated: false,
    token: null,
    email: '',
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_REQUESTED:
            return {
                ...state,
                isAuthenticated: state.isAuthenticated,
            };
        case actionTypes.AUTH_RECEIVED:
            console.log('RECEIVED');
            console.log(action);
            return {
                ...state,
                isAuthenticated: action.token !== undefined 
                                 && action.token !== null 
                                 && action.token !== 'invalid' ? true : false,
                token: action.token,
                email: action.email,
            };
        case actionTypes.AUTH_ERROR:
            console.log('ERROR');
            console.log(action);
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
            };
        default:
            return state;
    }
};

export default reducer;