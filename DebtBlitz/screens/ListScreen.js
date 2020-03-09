import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Left,
  Button,
  Right,
  Icon,
  Item,
  Input
} from "native-base";
import CheckList from "../components/CheckList";

const { width, height } = Dimensions.get("window");
export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      list: [
        {
          task: "Carrots",
          isComplete: false,
          starred: false
        },
        {
          task: "Nuts",
          isComplete: true,
          starred: false
        },
        {
          task: "Lettuce",
          isComplete: false,
          starred: true
        },
        {
          task: "Arugula",
          isComplete: true,
          starred: false
        },
        {
          task: "Dressing",
          isComplete: false,
          starred: false
        },
        {
          task: "Cheese",
          isComplete: false,
          starred: false
        },
        {
          task: "Lime",
          isComplete: false,
          starred: false
        }
      ]
    };
  }
  toggleItem = index => {
    let list = this.state.list;
    list[index].isComplete = !list[index].isComplete;
    this.setState({ list });
  };
  render() {
    let source = require("../assets/add.png");

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
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
        <Button
          style={styles.addButton}
          onPress={() => {
            this.props.navigation.navigate("TaskEditor");
          }}
          transparent
        >
          <Image source={source} style={{ height: 60, width: 60 }} />
        </Button>
        <Header style={styles.header}>
          <Left>
            <Button
              active={true}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
              transparent
            >
              <Image
                source={require("../assets/back.png")}
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
              />
            </Button>
          </Left>
          {body}
          {right}
        </Header>

        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <Text style={{ color: "white", fontSize: 35 }}>Salad</Text>
        </View>
        <View style={{ paddingTop: 20, paddingBottom: 40 }} />
        <Content style={styles.content}>
          <CheckList list={this.state.list} toggleItem={this.toggleItem} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  Icon: {
    color: "#D8D8D8"
  },
  bgImage: {
    width: width,
    height: height,
    position: "absolute"
  },
  tabs: {
    backgroundColor: "transparent"
  },
  selectedTab: {
    textDecorationLine: "underline"
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1
  },
  content: { flex: 1, backgroundColor: "white", paddingTop: 10 }
});
