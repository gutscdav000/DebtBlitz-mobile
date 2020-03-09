import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  SafeAreaView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationBar from "../components/NavigationBar";

const { width, height } = Dimensions.get("window");
const tasks = [
  {
    time: "8:00",
    title: "Finish Home Screen",
    subtitle: "Web App",
    people: []
  },
  {
    time: "11:00",
    title: "Lunch Break",
    subtitle: "",
    people: []
  },
  {
    time: "14:00",
    title: "Design Meeting",
    subtitle: "Hangouts",
    people: [
      {
        img: require("../assets/avatar1.png")
      },
      {
        img: require("../assets/avatar2.png")
      },
      {
        img: require("../assets/avatar3.png")
      }
    ]
  }
];

export default class StartScreen extends React.Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  render() {
    let taskView = tasks.map((task, index) => {
      if (index > 2) {
        return null;
      }
      let borderBottom = null;
      if (index != 2) {
        borderBottom = {
          borderBottomWidth: 0.33,
          borderBottomColor: "#D8D8D8"
        };
      }
      let hour = "";
      let period;
      for (let i = 0; i < task.time.length; i++) {
        if (task.time.charAt(i) != ":") {
          hour += task.time.charAt(i);
        } else {
          break;
        }
      }
      hour = parseInt(hour);
      period = hour >= 12 ? "PM" : "AM";
      hour = hour > 12 ? hour - 12 : hour;

      let subtitle = task.subtitle ? (
        <Text style={{ color: "#D8D8D8", fontSize: 10, marginTop: 5 }}>
          {task.subtitle}
        </Text>
      ) : null;

      let images = task.people.map((item, index) => {
        return (
          <View key={index}>
            <Image
              style={{
                height: 20,
                width: 20,
                marginLeft: 10,
                marginBottom: 10
              }}
              source={item.img}
            />
          </View>
        );
      });
      return (
        <View key={index} style={{ minHeight: "10%", marginRight: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.15, alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#D8D8D8" }}>{hour}</Text>
              <Text
                style={{ fontSize: 10, color: "#D8D8D8", paddingBottom: 10 }}
              >
                {period}
              </Text>
            </View>
            <View
              style={[
                {
                  flex: 0.8,
                  paddingLeft: 10
                }
              ]}
            >
              <Text style={{ color: "white" }}>{task.title}</Text>
              {subtitle}
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.15 }} />
            <View style={[{ flex: 0.8, flexDirection: "row" }, borderBottom]}>
              {images}
            </View>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg-start.png")}
          style={styles.image}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationBar
              navigation={this.props.navigation}
              openDrawer={() => this.openDrawer()}
            />
            <View style={{ flex: 0.2, alignSelf: "stretch" }}>
              <View style={styles.panel}>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.weekDay}>Thursday</Text>
                  <Text style={styles.date}>February 19, 2019</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      source={require("../assets/sunny.png")}
                      style={styles.weatherIcon}
                    />
                    <Text style={styles.temperature}>&nbsp;58&#176;</Text>
                  </View>
                  <Text style={styles.location}>San Francisco</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.5, paddingTop: 10 }}>{taskView}</View>
            <View
              style={{
                bottom: 10,
                right: 10,
                position: "absolute",
                marginBottom: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("TaskEditor");
                }}
              >
                <Image
                  source={require("../assets/add.png")}
                  style={{ height: 60, width: 60 }}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "stretch",
    flex: 1
  },
  image: {
    width: width,
    height: height
  },
  navigation: {
    flex: 0.1,
    alignSelf: "stretch"
  },
  weekDay: { fontSize: 30, color: "white", fontWeight: "100" },
  date: {
    fontSize: 12,
    color: "#D8D8D8",
    fontWeight: "100",
    marginLeft: 5
  },
  weatherIcon: { height: 20, width: 20, marginTop: 10 },
  temperature: {
    fontSize: 30,
    color: "white",
    fontWeight: "100"
  },
  location: {
    fontSize: 12,
    color: "#D8D8D8",
    fontWeight: "100"
  },
  content: {
    flex: 0.25,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingTop: 10
  },
  panel: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center"
  },
  task: {
    flex: 0.8,
    borderBottomWidth: 1,
    alignContent: "center",
    borderBottomColor: "#D8D8D8"
  },
  menu: {
    height: 20,
    width: 20,
    marginLeft: 10
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10
  }
});
