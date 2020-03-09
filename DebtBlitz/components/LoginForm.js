import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Item, Input, Icon, Button } from "native-base";
// import AntIcon from "react-native-vector-icons/AntDesign";
// import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsgDisplayUser: false,
      errorMsgDisplayPwd: false
    };
  }
  render() {
    let errorMsg = (
      <View style={{ position: "absolute", bottom: -15, marginLeft: 15 }}>
        <Text style={{ fontSize: 10, color: "red" }}>
          This field is required
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View>
          <Item style={{ borderColor: "transparent", marginLeft: 20 }}>
            {/* <Icon
              active
              type="AntDesign"
              name="user"
              style={{ color: "#D8D8D8" }}
            /> */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Input
                style={{
                  color: "#D8D8D8",
                  marginLeft: 10,
                  marginRight: 20,
                  borderBottomColor: "#D8D8D8",
                  borderBottomWidth: 0.6
                }}
                placeholder={"Username"}
                placeholderTextColor={"#D8D8D8"}
                value={this.state.username}
                onChangeText={text => {
                  this.setState({ username: text, errorMsgDisplayUser: false });
                }}
              />
              {this.state.errorMsgDisplayUser ? errorMsg : null}
            </View>
          </Item>
        </View>
        <View style={{ marginTop: 10 }}>
          <Item style={{ borderColor: "transparent", marginLeft: 20 }}>
            {/* <Icon
              active
              type="AntDesign"
              name="lock1"
              style={{ color: "#D8D8D8" }}
            /> */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Input
                style={{
                  marginLeft: 10,
                  marginRight: 20,
                  color: "#D8D8D8",
                  borderBottomColor: "#D8D8D8",
                  borderBottomWidth: 0.6
                }}
                placeholder={"Password"}
                placeholderTextColor={"#D8D8D8"}
                value={this.state.password}
                onChangeText={text => {
                  this.setState({
                    password: text,
                    errorMsgDisplayPwd: false
                  });
                }}
                secureTextEntry={true}
              />
              {this.state.errorMsgDisplayPwd ? errorMsg : null}
            </View>
          </Item>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            style={styles.button}
            onPress={() => {
              if (this.state.username == "" && this.state.password == "") {
                this.setState({
                  errorMsgDisplayUser: true,
                  errorMsgDisplayPwd: true
                });
              } else if (this.state.username == "") {
                this.setState({ errorMsgDisplayUser: true });
              } else if (this.state.password == "") {
                this.setState({ errorMsgDisplayPwd: true });
              } else {
                this.props.getCredentials();
                this.setState({
                  username: "",
                  password: "",
                  errorMsgDisplayPwd: false,
                  errorMsgDisplayUser: false
                });
              }
            }}
          >
            <Text style={{ color: "white" }}>Sign In</Text>
          </Button>
        </View>
        <View>
          <View style={styles.signUp}>
            <Text style={{ color: "#979797", fontSize: 12 }}>
              Don&#x27;t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignUp");
                this.setState({
                  username: "",
                  password: "",
                  errorMsgDisplayPwd: false,
                  errorMsgDisplayUser: false
                });
              }}
            >
              <Text style={{ color: "#D8D8D8", fontSize: 12 }}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  username: {
    flexDirection: "row"
  },
  textInput: {
    flex: 0.8,
    height: 40,
    top: -10,
    alignSelf: "stretch"
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#FF3366",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: width / 2 - 50,
    paddingRight: width / 2 - 50,
    borderRadius: 30
  },
  signUp: {
    alignSelf: "center",
    paddingTop: 10,
    flexDirection: "row",
    marginTop: 20
  }
});
