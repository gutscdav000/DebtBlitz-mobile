import React from "react";
import { Content } from "native-base";

export default class TabView extends React.Component {
  render() {
    let tabs = this.props.list;
    let tab = tabs[this.props.index - 1];

    return (
      <Content
        style={{
          backgroundColor: "white",
          marginTop: 0,
          flex: 1
        }}
      >
        {tab}
      </Content>
    );
  }
}
