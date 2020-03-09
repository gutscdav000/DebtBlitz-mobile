import React from "react";
import { Text, ListItem, Content, Switch, Body, Right } from "native-base";
import { Image } from "react-native";

export default class SocialTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          feature: "Facebook",
          marked: true
        }
      ]
    };
  }
  render() {
    return (
      <Content>
        {this.state.list.map((item, index) => {
          return (
            <ListItem key={index}>
              <Body style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/fb.png")}
                  style={{ height: 20, width: 20 }}
                  resizeMode={"contain"}
                />
                <Text>{item.feature}</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={() => {
                    let list = this.state.list;
                    list[index].marked = !list[index].marked;
                    this.setState({ list });
                  }}
                  value={item.marked}
                />
              </Right>
            </ListItem>
          );
        })}
      </Content>
    );
  }
}
