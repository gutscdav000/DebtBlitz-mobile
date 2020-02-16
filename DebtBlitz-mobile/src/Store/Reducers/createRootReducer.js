import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// custom reducers
import Accounts from './Accounts';
import Bills from './Bills';
import Incomes from './Incomes';
import Authentication from './Authentication';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  accounts: Accounts,
  bills: Bills,
  incomes: Incomes,
  authentication: Authentication,
})
export default createRootReducer
