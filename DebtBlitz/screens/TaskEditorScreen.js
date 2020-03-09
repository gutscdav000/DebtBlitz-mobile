import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Left,
  Button,
  Right,
  Icon,
  Form,
  Item,
  Input
} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get("window");
export default class TaskEditorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      startTime: "--",
      endTime: "--",
      startTimePickerVisible: false,
      endTimePickerVisible: false
    };
  }

  showStartDateTimePicker = () => {
    this.setState({ startTimePickerVisible: true });
  };

  hideStartDateTimePicker = () => {
    this.setState({ startTimePickerVisible: false });
  };

  handleStartDatePicked = date => {
    this.setState({
      startTimePickerVisible: false,
      startTime: date.getHours().toString() + ":" + date.getMinutes().toString()
    });
  };

  showEndDateTimePicker = () => {
    this.setState({ endTimePickerVisible: true });
  };

  hideEndDateTimePicker = () => {
    this.setState({ endTimePickerVisible: false });
  };

  handleEndDatePicked = date => {
    this.setState({
      endTimePickerVisible: false,
      endTime: date.getHours().toString() + ":" + date.getMinutes().toString()
    });
  };

  render() {
    const title = this.props.navigation.getParam("title", "New Item");

    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
        <Header style={styles.header}>
          <Left>
            <Button
              active={true}
              onPress={() => {
                this.props.navigation.goBack();
              }}
              transparent
            >
              <Icon style={styles.Icon} name="close" />
            </Button>
          </Left>
          <Body />
          <Right>
            <Button
              onPress={() => {
                this.props.navigation.goBack();
                this.props.navigation.navigate("Home");
              }}
              transparent
            >
              <Icon
                name="check"
                type="AntDesign"
                style={{ color: "#D8D8D8" }}
              />
            </Button>
          </Right>
        </Header>

        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <Text style={{ color: "white", fontSize: 35 }}>{title}</Text>
        </View>
        <View style={{ paddingTop: 20, paddingBottom: 40 }} />
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Form>
              <Item regular style={{ paddingTop: 10 }}>
                <Input placeholder={title} placeholderTextColor="#605f5f" />
              </Item>
              <Item
                style={{
                  marginLeft: 0,
                  paddingRight: 10,
                  justifyContent: "space-between",
                  paddingTop: 9,
                  paddingBottom: 9
                }}
              >
                <Text style={{ color: "#605f5f", marginLeft: 10, flex: 0.5 }}>
                  Date
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    flex: 0.5,
                    justifyContent: "flex-end"
                  }}
                  onPress={() => {
                    this.dobPicker.onPressDate();
                  }}
                >
                  <DatePicker
                    date={this.state.chosenDate}
                    androidMode={"default"}
                    confirmBtnText={"Confirm"}
                    cancelBtnText={"Cancel"}
                    customStyles={{
                      dateIcon: {},
                      dateInput: {
                        borderColor: "transparent"
                      },
                      placeholderText: {
                        color: "black"
                      }
                    }}
                    placeholder={new Date(Date.now()).toString().substr(4, 12)}
                    onDateChange={date => {
                      this.setState({ chosenDate: date });
                    }}
                    ref={component => (this.dobPicker = component)}
                  />
                </TouchableOpacity>
              </Item>
              <Item
                style={{
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 9,
                  paddingBottom: 9,
                  marginLeft: 0
                }}
              >
                <View>
                  <Text style={{ color: "#605f5f" }}>From</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.showStartDateTimePicker();
                    }}
                    style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
                    transparent
                  >
                    <Text style={{ paddingTop: 5 }}>
                      {this.state.startTime}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ color: "#605f5f" }}>To</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.showEndDateTimePicker();
                    }}
                    transparent
                  >
                    <Text style={{ paddingTop: 5 }}>{this.state.endTime}</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Button
                    onPress={() => {}}
                    style={{
                      marginRight: -8
                    }}
                    transparent
                  >
                    <Icon name="time" style={{ color: "#605f5f" }} />
                  </Button>
                </View>
              </Item>
              <Item
                style={{
                  justifyContent: "space-between",
                  marginLeft: 0,
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                <Text style={{ color: "#605f5f", fontSize: 13 }}>Location</Text>
                <Input
                  style={{ flex: 0.2, fontSize: 13 }}
                  defaultValue={this.props.navigation.getParam("subtitle", "")}
                  placeholder={"Location"}
                  placeholderTextColor={"black"}
                />
              </Item>
              <Item
                style={{
                  justifyContent: "space-between",
                  marginLeft: 0,
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                <Text style={{ fontSize: 13, color: "#605f5f" }}>
                  Notification
                </Text>
                <Input
                  style={{ flex: 0.4, fontSize: 13 }}
                  placeholder={"20 minutes before"}
                  placeholderTextColor={"black"}
                />
              </Item>
              <Item
                style={{
                  justifyContent: "space-between",
                  marginLeft: 0,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 8,
                  paddingBottom: 8,
                  height: 50
                }}
              >
                <Text style={{ fontSize: 13, color: "#605f5f" }}>
                  Who&#x27;s going
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/avatar1.png")}
                    style={{ height: 25, width: 25, marginRight: 10 }}
                  />
                  <Image
                    source={require("../assets/avatar2.png")}
                    style={{ height: 25, width: 25, marginRight: 10 }}
                  />
                  <Image
                    source={require("../assets/avatar3.png")}
                    style={{ height: 25, width: 25 }}
                  />
                </View>
              </Item>
              <Item
                style={{
                  justifyContent: "space-between",
                  marginLeft: 0,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 8,
                  height: 50,
                  borderBottomWidth: 0
                }}
              >
                <Text style={{ fontSize: 13, color: "#605f5f" }}>Repeat</Text>
                <Text>None</Text>
              </Item>
              <DateTimePicker
                mode={"time"}
                isVisible={this.state.startTimePickerVisible}
                onConfirm={date => this.handleStartDatePicked(date)}
                onCancel={this.hideStartDateTimePicker}
              />
              <DateTimePicker
                mode={"time"}
                isVisible={this.state.endTimePickerVisible}
                onConfirm={date => this.handleEndDatePicked(date)}
                onCancel={this.hideEndDateTimePicker}
              />
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0
  },
  Icon: {
    color: "#D8D8D8"
  },
  bgImage: {
    width: width,
    height: height,
    position: "absolute"
  },
  tabs: {
    backgroundColor: "transparent"
  },
  selectedTab: {
    textDecorationLine: "underline"
  }
});
