import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard
} from "react-native";
import { Container, Root, Content } from "native-base";
import LoginForm from "../components/LoginForm";
// import SplashScreen from "react-native-splash-screen";
import {SplashScreen} from 'expo';
import { StackActions, NavigationActions } from "react-navigation";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardOpen: false
    };
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({
          keyboardOpen: true
        });
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({
          keyboardOpen: false
        });
      }
    );
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  getCredentials() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Start" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    return (
      <Root>
        <Container style={styles.container}>
          <StatusBar backgroundColor="#6C61A3" barStyle="light-content" />
          <ImageBackground
            source={require("../assets/bg-app.png")}
            style={styles.image}
          >
            <Content
              contentContainerStyle={{
                justifyContent: "space-between",
                flexGrow: 1
              }}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={require("../assets/Logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <LoginForm
                navigation={this.props.navigation}
                getCredentials={() => {
                  this.getCredentials();
                }}
                errorMsgDisplayUser={this.state.errorMsgDisplayUser}
                errorMsgDisplayPwd={this.state.errorMsgDisplayPwd}
              />
            </Content>
          </ImageBackground>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  logo: {
    height: 120,
    width: 180
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
