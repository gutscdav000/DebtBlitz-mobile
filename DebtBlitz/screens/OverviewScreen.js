import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import {
  Container,
  Text,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading
} from "native-base";
import MonthlyTab from "../components/MonthlyTab";
import HeaderSearch from "../components/HeaderSearch";

const { width, height } = Dimensions.get("window");
export default class OverviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1
    };
  }
  componentDidMount() {
    const initialPage = 1;
    // eslint-disable-next-line no-undef
    setTimeout(this.tabs.goToPage.bind(this.tabs, initialPage));
  }

  render() {
    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
        <HeaderSearch navigation={this.props.navigation} />
        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              style={{
                backgroundColor: "transparent",
                borderWidth: 0
              }}
              underlineStyle={{ width: 0 }}
            />
          )}
          initialPage={1}
          ref={component => {
            this.tabs = component;
          }}
          onChangeTab={e => {
            this.setState({
              active: e.i
            });
          }}
        >
          <Tab
            heading={
              <TabHeading
                textStyle={{ fontSize: 20 }}
                style={{ backgroundColor: "transparent" }}
              >
                <Text
                  style={[
                    { fontWeight: "100" },
                    this.state.active === 0
                      ? { fontSize: 35, color: "white" }
                      : { fontSize: 25, color: "#eaebed" }
                  ]}
                >
                  WEEKLY
                </Text>
              </TabHeading>
            }
            activeTextStyle={{ color: "white" }}
            style={{ backgroundColor: "transparent" }}
          >
            <MonthlyTab />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "transparent" }}>
                <Text
                  style={[
                    { fontWeight: "100" },
                    this.state.active === 1
                      ? { fontSize: 35, color: "white" }
                      : { fontSize: 25, color: "#eaebed" }
                  ]}
                >
                  MONTHLY
                </Text>
              </TabHeading>
            }
            activeTextStyle={{ color: "white" }}
            style={{ backgroundColor: "transparent", flex: 1 }}
          >
            <MonthlyTab />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "transparent" }}>
                <Text
                  style={[
                    { fontWeight: "100" },
                    this.state.active === 2
                      ? { fontSize: 35, color: "white" }
                      : { fontSize: 25, color: "#eaebed" }
                  ]}
                >
                  CUSTOM
                </Text>
              </TabHeading>
            }
            style={{ backgroundColor: "transparent" }}
          >
            <MonthlyTab />
          </Tab>
        </Tabs>
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
  }
});
