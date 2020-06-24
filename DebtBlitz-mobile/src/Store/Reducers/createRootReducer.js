import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// custom reducers
import Accounts from './Accounts';
import Debts from './Debts';
import Incomes from './Incomes';
import Authentication from './Authentication';
import Actions from './Actions';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  accounts: Accounts,
  debts: Debts,
  incomes: Incomes,
  authentication: Authentication,
  actions: Actions
})
export default createRootReducer
