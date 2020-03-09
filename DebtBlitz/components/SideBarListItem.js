import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

export default class SideBarListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          paddingLeft: 20
        }}
        onPress={() => {
          this.props.navigation.closeDrawer();
          this.props.navigation.navigate(this.props.destination);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#D8D8D8",
            padding: 10,
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Image
            source={this.props.icon}
            style={{ width: 20, height: 20, left: -5, alignSelf: "center" }}
            resizeMode="contain"
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center"
            }}
          >
            <Text style={{ marginLeft: 20, color: "black" }}>
              {this.props.title}
            </Text>
            <Text style={{}}>{this.props.notification}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
