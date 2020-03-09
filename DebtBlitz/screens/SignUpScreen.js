import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  Button,
  Text,
  Container,
  Item,
  Input,
  Icon,
  Root,
  Content
} from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get("window");

// prettier-ignore
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      birthday: "",
      errorMsgName: false,
      errorMsgEmail: false,
      errorMsgPwd: false,
      errorMsgbday: false
    };
  }

  validateAndNavigate() {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.birthday
    ) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Introduction" })]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  render() {
    let errorMsg = (
      <View style={{ position: "absolute", bottom: -15, marginLeft: 15 }}>
        <Text style={{ fontSize: 10, color: "red" }}>
          This field is required
        </Text>
      </View>
    );
    let invalidEmail = (
      <View style={{ position: "absolute", bottom: -15, marginLeft: 15 }}>
        <Text style={{ fontSize: 10, color: "red" }}>Invalid Email</Text>
      </View>
    );
    return (
      <Root>
        <Container style={styles.container}>
          <Content bounces={false}>
            <ImageBackground
              source={require("../assets/bg.png")}
              style={styles.image}
            >
              <SafeAreaView style={{ flex: 1, width: "100%" }}>
                <View style={{ flex: 0.1 }}>
                  <Button
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    style={styles.row}
                    transparent
                  >
                    <Image
                      source={require("../assets/back.png")}
                      style={styles.backButton}
                    />
                  </Button>
                </View>
                <View style={{ flex: 0.1 }}>
                  <View style={styles.row}>
                    <Text style={styles.title}>New Account</Text>
                  </View>
                </View>
                <View style={styles.pictureContainer}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      source={require("../assets/add-photo.png")}
                      style={styles.picInput}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.horizontalContainer}>
                    <Item
                      style={{ borderColor: "transparent", marginLeft: 20 }}
                    >
                      <Icon
                        active
                        type="AntDesign"
                        name="user"
                        style={{ color: "#D8D8D8" }}
                      />
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
                          value={this.state.name}
                          onChangeText={text => {
                            this.setState({ name: text, errorMsgName: false });
                          }}
                        />
                        {this.state.errorMsgName ? errorMsg : null}
                      </View>
                    </Item>
                  </View>
                  <View style={styles.horizontalContainer}>
                    <Item
                      style={{ borderColor: "transparent", marginLeft: 20 }}
                    >
                      <Icon
                        active
                        type="MaterialCommunityIcons"
                        name="email-outline"
                        style={{ color: "#D8D8D8" }}
                      />
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Input
                          value={this.state.email}
                          style={{
                            color: "#D8D8D8",
                            marginLeft: 10,
                            marginRight: 20,
                            borderBottomColor: "#D8D8D8",
                            borderBottomWidth: 0.6
                          }}
                          placeholder={"Email"}
                          placeholderTextColor={"#D8D8D8"}
                          onChangeText={text => {
                            this.setState({
                              email: text,
                              errorMsgEmail: false
                            });
                          }}
                        />
                        {this.state.errorMsgEmail
                          ? errorMsg
                          : validEmail.test(this.state.email)
                          ? null
                          : this.state.email
                          ? invalidEmail
                          : null}
                      </View>
                    </Item>
                  </View>
                  <View style={styles.horizontalContainer}>
                    <Item
                      style={{ borderColor: "transparent", marginLeft: 20 }}
                    >
                      <Icon
                        active
                        type="AntDesign"
                        name="lock1"
                        style={{ color: "#D8D8D8" }}
                      />
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Input
                          value={this.state.password}
                          style={{
                            marginLeft: 10,
                            marginRight: 20,
                            borderBottomColor: "#D8D8D8",
                            color: "#D8D8D8",
                            borderBottomWidth: 0.6
                          }}
                          placeholder={"Password"}
                          placeholderTextColor={"#D8D8D8"}
                          onChangeText={text => {
                            this.setState({
                              password: text,
                              errorMsgPwd: false
                            });
                          }}
                          secureTextEntry={true}
                        />
                        {this.state.errorMsgPwd ? errorMsg : null}
                      </View>
                    </Item>
                  </View>
                  <View
                    style={[styles.horizontalContainer, { marginRight: 10 }]}
                  >
                    <Item
                      style={{
                        borderColor: "transparent",
                        marginLeft: 20,
                        marginTop: 5
                      }}
                    >
                      <Icon
                        active
                        type="MaterialCommunityIcons"
                        name="gift"
                        style={{ color: "#D8D8D8" }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginRight: 20
                        }}
                      >
                        <View
                          style={{
                            borderBottomWidth: 0.66,
                            marginLeft: 10,
                            borderBottomColor: "#D8D8D8",
                            width: "100%"
                          }}
                        >
                          <DatePicker
                            date={this.state.birthday}
                            androidMode={"default"}
                            confirmBtnText={"Confirm"}
                            cancelBtnText={"Cancel"}
                            placeholder="Birthday"
                            customStyles={{
                              dateIcon: {
                                display: "none"
                              },
                              dateInput: {
                                borderColor: "transparent"
                              },
                              placeholderText: {
                                color: "#D8D8D8",
                                fontSize: 18,
                                left: -30
                              },
                              dateText: {
                                color: "#D8D8D8",
                                fontSize: 18,
                                left: -20
                              }
                            }}
                            maxDate={new Date()}
                            onDateChange={newDate => {
                              this.setState({
                                birthday: newDate,
                                errorMsgbday: false
                              });
                            }}
                            disabled={false}
                          />
                        </View>
                        {this.state.errorMsgbday ? errorMsg : null}
                      </View>
                    </Item>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      if (!this.state.name) {
                        this.setState({ errorMsgName: true });
                      }
                      if (!this.state.email) {
                        this.setState({ errorMsgEmail: true });
                      }
                      if (!this.state.password) {
                        this.setState({ errorMsgPwd: true });
                      }
                      if (!this.state.birthday) {
                        this.setState({ errorMsgbday: true });
                      }
                      this.validateAndNavigate();
                    }}
                  >
                    <Text style={{ color: "#D8D8D8" }}>Create</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </Content>
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
    width: width,
    height: height,
    alignItems: "flex-start"
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  horizontalContainer: {
    flex: 0.8,
    alignSelf: "stretch"
  },
  title: {
    fontSize: 30,
    marginLeft: 35,
    color: "#D8D8D8",
    fontWeight: "100"
  },
  pictureContainer: { flex: 0.25, alignSelf: "stretch" },
  picInput: { height: 100, width: 100, marginTop: 15 },
  backButton: { width: 20, height: 20, marginTop: 20, marginLeft: 15 },
  formContainer: {
    flex: 0.5,
    alignSelf: "stretch",
    justifyContent: "space-evenly"
  },
  formLine: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1
  },
  logo: {
    height: 20,
    width: 20,
    flex: 0.2
  },
  textInput: {
    flex: 0.8,
    height: 40,
    top: -10,
    alignSelf: "stretch"
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  button: {
    marginBottom: 30,
    backgroundColor: "#FF3366",
    paddingLeft: width / 2 - 50,
    paddingRight: width / 2 - 50,
    borderRadius: 30,
    paddingTop: 15,
    paddingBottom: 15
  }
});
