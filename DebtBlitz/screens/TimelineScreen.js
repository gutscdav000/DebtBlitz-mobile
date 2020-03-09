import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import Timeline from "../components/Timeline";
import HeaderSearch from "../components/HeaderSearch";

const { width, height } = Dimensions.get("window");
export default class TimelineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        time: "17:00",
        title: "Website Redesign",
        description: "",
        circleColor: "#50D2C2"
      },
      {
        time: "14:00",
        title: "Design Meeting",
        description: "Hangouts",
        circleColor: "#FCAB53",
        imageSrcList: [
          require("../assets/avatar1.png"),
          require("../assets/avatar2.png"),
          require("../assets/avatar3.png")
        ]
      },
      {
        time: "11:00",
        title: "Lunch Break",
        description: "",
        circleColor: "#50D2C2"
      },
      {
        time: "8:00",
        title: "Finish Home Screen",
        description: "Web App",
        circleColor: "#50D2C2"
      }
    ];
  }

  render() {
    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
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
            source={require("../assets/filter.png")}
            style={{ height: 60, width: 60 }}
          />
        </Button>
        <HeaderSearch navigation={this.props.navigation} />

        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <Text style={{ color: "white", fontSize: 25 }}>Timeline</Text>
          <Text style={{ color: "#D8D8D8", fontSize: 15 }}> March 2019</Text>
        </View>
        <View style={{ paddingTop: 20, paddingBottom: 40 }} />
        <Content style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#edeeef",
              padding: 20
            }}
          >
            <Text style={{ fontSize: 13, color: "#1D1D26" }}>
              MON, MAR 23, 2019
            </Text>
          </View>
          <Timeline data={this.data} />
          <View style={{ backgroundColor: "#edeeef", padding: 20 }}>
            <Text style={{ fontSize: 13, color: "#1D1D26" }}>
              TUE, MAR 24, 2019
            </Text>
          </View>
          <Timeline data={this.data} />
        </Content>
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
