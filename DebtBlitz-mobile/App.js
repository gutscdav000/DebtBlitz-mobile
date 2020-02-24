import React, { useEffect } from 'react';
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
// native-base
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
// debug
import { composeWithDevTools } from 'redux-devtools-extension';

const tabNav = createBottomTabNavigator({
  // Login: {
  //     screen: Login,
  //     navigationOptions: {
  //         title: "Login",
  //         tabBarIcon: ({ tintColor }) => (
  //             <Icon
  //                 name="microchip"
  //                 size={17}
  //                 color={tintColor} />
  //         )
  //     }
  // },
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

const Navigator = createStackNavigator({
  Home: tabNav,
  Login: Login,
}, 
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
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);

const AppContainer = createAppContainer(Navigator);

const App =  props => {

  useEffect( () => {
    const load = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    }
    load();
  }, []);
  
  return <>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </>
}

export default App;
