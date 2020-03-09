import React from "react";
import { Text, ListItem, Content, Switch, Body, Right } from "native-base";

export default class AlertsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          feature: "Notification",
          marked: true
        },
        {
          feature: "Pop Up",
          marked: false
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
              <Body>
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
