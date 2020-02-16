import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
// screens
import SearchScreen from './src/screens/SearchScreen';
import ResultsShow from './src/screens/ResultsShow';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
// redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import { PersistGate } from 'redux-persist/integration/react'
//reducers
import Accounts from './src/Store/Reducers/Accounts';
import Bills from './src/Store/Reducers/Bills';
import Incomes from './src/Store/Reducers/Incomes';
import Authentication from './src/Store/Reducers/Authentication';

const Navigator = createStackNavigator({
  Search: SearchScreen,
  ResultsShow: ResultsShow,
  Home: Home,
  Login: Login,
}, 
// {
//   initialRouteName: 'Search',
//   defaultNavigationOptions: {
//     title: 'Business Search'
//   } 
// }
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    title: 'Login'
  } 
}
);

const rootReducer = combineReducers({
  accounts: Accounts,
  bills: Bills,
  incomes: Incomes,
  authentication: Authentication,
});

let store = createStore(rootReducer, 
      applyMiddleware(thunk)
);

const AppContainer = createAppContainer(Navigator);

const App =  props => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default App;
