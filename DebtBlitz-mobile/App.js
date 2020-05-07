import React, { useEffect, useState } from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
//fonts
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
// screens
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Messages from './src/screens/Messages';
import Tools from './src/screens/Tools';
import Account from './src/screens/Account';
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
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';

// debug
import { composeWithDevTools } from 'redux-devtools-extension';

const tabNav = createBottomTabNavigator({
  Home: {
      screen: Home,
      navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name="chart-bar"
                  size={25}
                  color={tintColor} />
          )
      }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
        tabBarLabel: "Messages",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="comments"
                size={25}
                color={tintColor} />
        )
    }
},
Tools: {
  screen: Tools,
  navigationOptions: {
      tabBarLabel: "Tools",
      tabBarIcon: ({ tintColor }) => (
          <Icon
              name="cogs"
              size={24}
              color={tintColor} />
      )
  }
},
Account: {
  screen: Account,
  navigationOptions: {
      tabBarLabel: "Account",
      tabBarIcon: ({ tintColor }) => (
          <Icon
              name="user"
              size={25}
              color={tintColor} />
      )
  }
},
}, {
  tabBarOptions: { showLabel: false }
});

const Navigator = createStackNavigator({
  Home: tabNav,
  Login: Login,
}, 
{
  // initialRouteName: 'Login',
  initialRouteName: 'Home',
  headerMode: 'none',
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
  const [ loadedFont, setLoadedFont ] = useState(false);

  useEffect( () => {

    const fetchFonts = async () => {
      await Font.loadAsync({
        'lato-black': require('./assets/fonts/Lato-Black.ttf'),
        'lato-black-italic': require('./assets/fonts/Lato-BoldItalic.ttf'),
        'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
        'lato-italic': require('./assets/fonts/Lato-Italic.ttf'),
        'lato-light': require('./assets/fonts/Lato-Light.ttf'),
        'lato-light-italic': require('./assets/fonts/Lato-LightItalic.ttf'),
        'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
        'lato-thin': require('./assets/fonts/Lato-Thin.ttf'),
        'lato-thin-italic': require('./assets/fonts/Lato-ThinItalic.ttf'),
        // hack to get native base working
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      setLoadedFont(true);
    };
    fetchFonts();
  }, []);



  return !loadedFont? null: <> 
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </>
}

export default App;
