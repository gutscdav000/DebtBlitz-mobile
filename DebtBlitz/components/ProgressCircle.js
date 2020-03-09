import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text } from "react-native";

export default class ProgressCircle extends React.Component {
  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        {/* <AnimatedCircularProgress
          size={80}
          width={2}
          fill={this.props.fill}
          rotation={0}
          duration={1250}
          tintColor={this.props.tintColor}
          backgroundColor="#D8D8D8"
        /> */}
        <Text
          style={{
            position: "absolute",
            alignSelf: "center",
            fontSize: 20,
            color: "white"
          }}
        >
          {this.props.fill}
          <Text style={{ fontSize: 10 }}>%</Text>
        </Text>
      </View>
    );
  }
}
