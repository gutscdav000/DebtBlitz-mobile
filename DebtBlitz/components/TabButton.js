import React from "react";
import { Text } from "native-base";
import { TouchableOpacity } from "react-native";

export default class TabButton extends React.Component {
  render() {
    let tabViewStyle = {
      borderBottomWidth: 4,
      marginLeft: 40,
      padding: 5
    };
    if (this.props.active === this.props.index) {
      tabViewStyle.borderBottomColor = "#D8D8D8";
    } else {
      tabViewStyle.borderBottomColor = "transparent";
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.changeState(this.props.index);
        }}
        style={tabViewStyle}
        transparent
      >
        <Text style={this.props.style}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
