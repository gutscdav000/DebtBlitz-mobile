import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import { Container, Text, Button } from "native-base";
import HeaderSearch from "../components/HeaderSearch";
import TabButton from "../components/TabButton";
import TabView from "../components/TabView";
import DayTab from "../components/DayTab";
import WeekTab from "../components/WeekTab";
import MonthTab from "../components/MonthTab";

const { width, height } = Dimensions.get("window");
export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.list = [
      <DayTab key={0} navigation={this.props.navigation} />,
      <WeekTab key={1} navigation={this.props.navigation} />,
      <MonthTab key={2} navigation={this.props.navigation} />
    ];
    this.state = {
      tab: 1
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

        <Button
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            zIndex: 1
          }}
          onPress={() => {
            this.props.navigation.navigate("TaskEditor");
          }}
          transparent
        >
          <Image
            source={require("../assets/add.png")}
            resizeMode="contain"
            style={{ height: 60, width: 60 }}
          />
        </Button>
        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <Text style={{ color: "white", fontSize: 30 }}>Wednesday</Text>
          <Text style={{ color: "#D8D8D8", fontSize: 12 }}>
            February 18, 2019
          </Text>
        </View>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TabButton
              style={[styles.tabStyle]}
              active={this.state.tab}
              index={1}
              title={"DAY"}
              changeState={this.changeState}
            />
            <TabButton
              style={[styles.tabStyle]}
              active={this.state.tab}
              index={2}
              title={"WEEK"}
              changeState={this.changeState}
            />
            <TabButton
              style={[styles.tabStyle]}
              active={this.state.tab}
              index={3}
              title={"MONTH"}
              changeState={this.changeState}
            />
          </View>
          <TabView
            navigation={this.props.navigation}
            index={this.state.tab}
            list={this.list}
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
