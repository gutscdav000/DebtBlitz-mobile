import React from "react";
import { View, Image } from "react-native";
import { ListItem, Text, Body } from "native-base";

export default class CheckList extends React.Component {
  render() {
    return (
      <View>
        {this.props.list.map((item, index) => {
          let iconSource = item.isComplete
            ? require("../assets/done.png")
            : require("../assets/do.png");
          let style = item.isComplete
            ? {
                color: "#605f5f"
              }
            : {};
          let star = item.starred ? (
            <Image
              source={require("../assets/star.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ) : (
            <View />
          );
          return (
            <ListItem
              button
              key={`item-${index}`}
              style={{ marginLeft: 0, paddingTop: 20, paddingBottom: 20 }}
              onPress={() => this.props.toggleItem(index)}
            >
              <Image
                source={iconSource}
                style={{ width: 20, height: 20, marginLeft: 20 }}
                resizeMode={"contain"}
              />
              <Body
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <Text style={style}>{item.task}</Text>
                {star}
              </Body>
            </ListItem>
          );
        })}
      </View>
    );
  }
}
