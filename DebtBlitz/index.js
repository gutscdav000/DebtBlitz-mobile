import { AppRegistry, View } from "react-native";
import { registerRootComponent } from 'expo';
import { StyleProvider } from "native-base";
import App from './App';
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";

import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StyleProvider style={getTheme(platform)}>
          <App />
        </StyleProvider>
      </View>
    );
  }
}


registerRootComponent(Main);