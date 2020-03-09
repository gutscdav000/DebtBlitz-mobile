import React from "react";
import { Image, StyleSheet } from "react-native";
import { Header, Body, Left, Button, Right, Icon } from "native-base";
import * as Font from 'expo-font';


export default class NavigationBar extends React.Component {
  render() {
    return  (
      <Header style={styles.header}>
        <Left>
          <Button
            active={true}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
            transparent
          >
            <Icon style={styles.Icon} name="menu" />
          </Button>
        </Left>
        <Body />
        <Right>
          <Button
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
            transparent
          >
            <Image
              source={require("../assets/avatar.png")}
              style={{ height: 25, width: 25 }}
            />
          </Button>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: -20
  },
  menu: {
    height: 20,
    width: 20,
    marginLeft: 10
  },
  Icon: {
    color: "#D8D8D8",
    height: 25,
    width: 25,
    marginRight: 10
  }
});
