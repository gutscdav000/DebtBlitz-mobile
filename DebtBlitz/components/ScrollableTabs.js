import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Content } from "native-base";

const { width } = Dimensions.get("window");

export default class ScrollableTabs extends React.Component {
  render() {
    let taskList = this.props.tasks.map((item, index) => {
      let status;
      if (item.status === "completed") {
        status = require("../assets/completed.png");
      } else if (item.status === "snoozed") {
        status = require("../assets/snoozed.png");
      } else if (item.status === "overdue") {
        status = require("../assets/overdue-padded.png");
      }

      let borderBottom = {};
      if (index != this.props.tasks.length - 1) {
        borderBottom = {
          borderBottomWidth: 1,
          borderBottomColor: "#D8D8D8"
        };
      }

      let hour = "";
      let period;
      for (let i = 0; i < item.time.length; i++) {
        if (item.time.charAt(i) != ":") {
          hour += item.time.charAt(i);
        } else {
          break;
        }
      }
      hour = parseInt(hour);
      period = hour >= 12 ? "PM" : "AM";
      hour = hour > 12 ? hour - 12 : hour;

      let images = item.people.map((people, index) => {
        return (
          <View key={index}>
            <Image
              style={{
                height: 20,
                width: 20,
                marginLeft: 10,
                marginBottom: 10
              }}
              source={people.img}
            />
          </View>
        );
      });

      return (
        <View key={index} style={borderBottom}>
          <View style={[styles.task]}>
            <Image
              source={status}
              resizeMode={"contain"}
              style={styles.status}
            />
            <View style={{ flex: 0.7 }}>
              <Text style={{ fontSize: 15 }}>{item.title}</Text>
              <Text style={{ fontSize: 10 }}>{item.subtitle}</Text>
            </View>
            <View style={{ flex: 0.1, alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>{hour}</Text>
              <Text style={{ fontSize: 10 }}>{period}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.1 }} />
            <View style={{ flex: 0.7, flexDirection: "row", paddingLeft: 20 }}>
              {images}
            </View>
          </View>
        </View>
      );
    });
    return (
      <View>
        <View style={styles.tabBar}>
          <Text style={{ fontSize: 13 }}>
            {this.props.month} {this.props.year}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.goPrevious(this.props.index);
              }}
            >
              <Image
                source={require("../assets/left.png")}
                resizeMode={"contain"}
                style={{ width: 20, height: 20, marginRight: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.goToNext(this.props.index);
              }}
            >
              <Image
                source={require("../assets/right.png")}
                resizeMode={"contain"}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Content>{taskList}</Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
    marginLeft: 0,
    backgroundColor: "#edeeef"
  },
  task: {
    flexDirection: "row",
    marginLeft: 20,
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 20,
    justifyContent: "space-between"
  },
  status: {
    width: 7,
    height: 7,
    top: 7,
    flex: 0.1
  }
});
