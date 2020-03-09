import React, { useEffect, useState } from 'react';
// import { createAppContainer } from 'react-native';
import { createAppContainer } from 'react-navigation';
// native base
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
// navigation
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
// screens
import LoginScreen from './screens/LoginScreen';
import IntroductionScreen from "./screens/IntroductionScreen";
import SignUpScreen from "./screens/SignUpScreen";
import StartScreen from "./screens/StartScreen";
import CalendarScreen from "./screens/CalendarScreen";
import TaskEditorScreen from "./screens/TaskEditorScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GroupsScreen from "./screens/GroupsScreen";
import TimelineScreen from "./screens/TimelineScreen";
import ListScreen from "./screens/ListScreen";
import OverviewScreen from "./screens/OverviewScreen";
import SideBar from "./components/SideBar";

const ListStack = createStackNavigator(
  {
    List: { screen: ListScreen },
    TaskEditor: { screen: TaskEditorScreen }
  },
  { headerMode: "none" }
);

const CalendarStack = createStackNavigator(
  {
    Calendar: { screen: CalendarScreen },
    TaskEditor: { screen: TaskEditorScreen }
  },
  {
    headerMode: "none"
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: StartScreen },
    Calendar: { screen: CalendarStack },
    TaskEditor: { screen: TaskEditorScreen },
    Settings: { screen: SettingsScreen },
    Profile: { screen: ProfileScreen },
    Groups: { screen: GroupsScreen },
    Timeline: { screen: TimelineScreen },
    List: { screen: ListStack },
    Overview: { screen: OverviewScreen }
  },
  {
    headerMode: "none",
    initialRouteName: "Home",
    contentComponent: SideBar
  }
);

const StartNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen},
    Introduction: { screen: IntroductionScreen },
    SignUp: { screen: SignUpScreen },
    Start: { screen: MainNavigator }
  },
  { headerMode: "none" }
);

const AppContainer = createAppContainer(StartNavigator);

const App =  props => {
  const [fontLoaded, setFontLoaded ] = useState(false);
  useEffect( () => {
    const load = async () => {
      await Font.loadAsync({
        'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
        'Anticons': require('native-base/Fonts/AntDesign.ttf'),
        'Materialicons': require('native-base/Fonts/MaterialIcons.ttf'),
      });
      setFontLoaded(true);
    }
    load();
  }, []);
  
  return !fontLoaded ? null : (
      <AppContainer />
  )
}

export default App;