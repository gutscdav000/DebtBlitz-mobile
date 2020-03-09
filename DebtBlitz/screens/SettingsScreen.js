import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import { Container, Text } from "native-base";
import TabButton from "../components/TabButton";
import TabView from "../components/TabView";
import GeneralTab from "../components/GeneralTab";
import AlertsTab from "../components/AlertsTab";
import SocialTab from "../components/SocialTab";
import HeaderSearch from "../components/HeaderSearch";

const { width, height } = Dimensions.get("window");
export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      list: [
        <GeneralTab
          key={0}
          navigation={this.props.navigation}
          profile={this.dummyProfile}
          changeBirthday={date => this.changeBirthday(date)}
        />,
        <AlertsTab key={1} navigation={this.props.navigation} />,
        <SocialTab key={2} navigation={this.props.navigation} />
      ]
    };
  }

  changeState = index => {
    if (index != this.state.tab)
      this.setState({
        tab: index
      });
  };
  render() {
    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
        <HeaderSearch navigation={this.props.navigation} />

        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <Text style={{ color: "white", fontSize: 30 }}>Settings</Text>
        </View>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TabButton
              style={[styles.tabStyle]}
              index={1}
              active={this.state.tab}
              title={"GENERAL"}
              changeState={this.changeState}
            />
            <TabButton
              style={[styles.tabStyle]}
              index={2}
              active={this.state.tab}
              title={"ALERTS"}
              changeState={this.changeState}
            />
            <TabButton
              style={[styles.tabStyle]}
              index={3}
              active={this.state.tab}
              title={"SOCIAL"}
              changeState={this.changeState}
            />
          </View>
          <TabView
            navigation={this.props.navigation}
            index={this.state.tab}
            list={this.state.list}
            style={{ flex: 0.8 }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "transparent",
    elevation: 0
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
  tabStyle: {
    fontSize: 12,
    color: "white"
  }
});
