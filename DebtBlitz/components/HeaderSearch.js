import React from "react";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Item,
  Input
} from "native-base";
import { StyleSheet, Keyboard } from "react-native";

export default class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
  }
  render() {
    let right = null;
    let body = null;
    if (!this.state.showSearch) {
      body = <Body />;
      right = (
        <Right>
          <Button
            onPress={() =>
              this.setState({ showSearch: !this.state.showSearch })
            }
            transparent
          >
            <Icon style={styles.Icon} name="search" />
          </Button>
        </Right>
      );
    } else {
      body = (
        <Body>
          <Item style={{ height: 30, backgroundColor: "transparent" }} rounded>
            <Input
              placeholder="Search"
              placeholderTextColor="white"
              style={{ color: "white" }}
            />
            <Button
              onPress={() => {
                this.setState({ showSearch: !this.state.showSearch });
              }}
              transparent
            >
              <Icon active name="close" style={{ color: "#D8D8D8", top: -7 }} />
            </Button>
          </Item>
        </Body>
      );
    }
    return (
      <Header style={styles.header}>
        <Left>
          <Button
            active={true}
            onPress={() => {
              Keyboard.dismiss();
              this.props.navigation.openDrawer();
            }}
            transparent
          >
            <Icon style={styles.Icon} name="menu" />
          </Button>
        </Left>
        {body}
        {right}
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    paddingLeft: 10,
    paddingRight: 10
  },
  Icon: {
    color: "#D8D8D8"
  }
});
