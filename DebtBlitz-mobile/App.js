import React from 'react';
// import {createStackNavigator} from 'react-navigation-stack';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
// screens
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
// react-native-paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// const Navigator = createStackNavigator({
//   Home: Home,
//   Login: Login,
// }, 
// {
//   initialRouteName: 'Login',
//   defaultNavigationOptions: {
//     title: 'Login'
//   } 
// }
// );
const tabNav = createBottomTabNavigator({
  Login: {
      screen: Login,
      navigationOptions: {
          title: "Login",
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name="microchip"
                  size={17}
                  color={tintColor} />
          )
      }
  },
  Home: {
      screen: Home,
      navigationOptions: {
          tabBarLabel: "Memory",
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name="memory"
                  size={17}
                  color={tintColor} />
          )
      }
  }
});

const rootReducer = combineReducers({
  accounts: Accounts,
  bills: Bills,
  incomes: Incomes,
  authentication: Authentication,
});

let store = createStore(rootReducer, 
      applyMiddleware(thunk)
);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

// const AppContainer = createAppContainer(Navigator);
const AppContainer = createAppContainer(tabNav);

const App =  props => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <AppContainer />
    </PaperProvider>
  </Provider>
)

export default App;
