import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import SideBarListItem from "./SideBarListItem";

export default class SideBar extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF", flex: 12 }}>
        <View style={styles.profile}>
          <View style={{ justifyContent: "center" }}>
            <Image
              source={require("../assets/avatar.png")}
              style={{ height: 40, width: 40 }}
            />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 20 }}>
            <Text style={{ fontSize: 25, color: "black" }}>Adam Lane</Text>
            <Text style={{ fontSize: 10 }}>adam@gmail.com</Text>
          </View>
        </View>
        <SideBarListItem
          icon={require("../assets/home.png")}
          title={"Home"}
          notification={"5"}
          navigation={this.props.navigation}
          destination={"Home"}
        />
        <SideBarListItem
          icon={require("../assets/calendar.png")}
          title={"Calendar"}
          notification={""}
          navigation={this.props.navigation}
          destination={"Calendar"}
        />
        <SideBarListItem
          icon={require("../assets/overview.png")}
          title={"Overview"}
          notification={""}
          navigation={this.props.navigation}
          destination={"Overview"}
        />
        <SideBarListItem
          icon={require("../assets/groups.png")}
          title={"Groups"}
          notification={"16"}
          navigation={this.props.navigation}
          destination={"Groups"}
        />
        <SideBarListItem
          icon={require("../assets/lists.png")}
          title={"Lists"}
          notification={"18"}
          navigation={this.props.navigation}
          destination={"List"}
        />
        <SideBarListItem
          icon={require("../assets/profile.png")}
          title={"Profile"}
          notification={""}
          navigation={this.props.navigation}
          destination={"Profile"}
        />
        <SideBarListItem
          icon={require("../assets/timeline.png")}
          title={"Timeline"}
          notification={""}
          navigation={this.props.navigation}
          destination={"Timeline"}
        />
        <SideBarListItem
          icon={require("../assets/settings.png")}
          title={"Settings"}
          notification={""}
          navigation={this.props.navigation}
          destination={"Settings"}
        />
        <SideBarListItem
          icon={require("../assets/logout.png")}
          title={"Logout"}
          notification={""}
          navigation={this.props.navigation}
          destination={"Login"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flex: 3,
    alignSelf: "stretch",
    paddingLeft: 20,
    flexDirection: "row"
  }
});
