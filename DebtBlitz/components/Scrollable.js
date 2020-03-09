import React from "react";
import { View, Image, Text, Dimensions } from "react-native";
import { Button } from "native-base";
import { LineChart } from "react-native-svg-charts";

const { width } = Dimensions.get("window");

export default class Scrollable extends React.Component {
  render() {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24];
    const data1 = [53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -2];
    const data2 = [-24, 85, 91, 35, 53, -53, 50, 10, 40, 95, -4, 24];
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          width: width
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
              paddingTop: "5%"
            }}
          >
            <Button
              transparent
              style={{ height: 20, width: 20 }}
              onPress={() => {
                this.props.goPrevious(this.props.index);
              }}
            >
              <Image
                source={require("../assets/left-white.png")}
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
              />
            </Button>
            <Text style={{ color: "#D8D8D8", fontSize: 18 }}>
              {this.props.month} {this.props.year}
            </Text>
            <Button
              transparent
              style={{ height: 20, width: 20 }}
              onPress={() => {
                this.props.goToNext(this.props.index);
              }}
            >
              <Image
                source={require("../assets/right-white.png")}
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
              />
            </Button>
          </View>
           <View
            style={{
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: "10%"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 45, color: "white", fontWeight: "100" }}
                >
                  {this.props.data.snoozed}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#D8D8D8", fontWeight: "100" }}
                >
                  Snoozed
                </Text>
                <Image
                  source={require("../assets/snoozed-padded.png")}
                  style={{ height: 25, width: 25, marginTop: 20 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 45, color: "white", fontWeight: "100" }}
                >
                  {this.props.data.completed}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#D8D8D8", fontWeight: "100" }}
                >
                  Completed
                </Text>
                <Image
                  source={require("../assets/completed-padded.png")}
                  style={{ height: 25, width: 25, marginTop: 20 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 45, color: "white", fontWeight: "100" }}
                >
                  {this.props.data.overdue}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#D8D8D8", fontWeight: "100" }}
                >
                  Overdue
                </Text>
                <Image
                  source={require("../assets/overdue-padded.png")}
                  style={{ height: 25, width: 25, marginTop: 20 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            paddingTop: "10%"
          }}
        >
          <Text> {data}</Text> 
          <LineChart
            style={{ height: 200, width: "100%" }}
            data={data}
            svg={{ stroke: "rgb(80,210,194)" }}
            contentInset={{ top: 20, bottom: 20 }}
          />
          <LineChart
            style={{ height: 200, marginTop: -200, width: "100%" }}
            data={data1}
            svg={{ stroke: "rgb(252,171,83)" }}
            contentInset={{ top: 20, bottom: 20 }}
          />
          <LineChart
            style={{ height: 200, marginTop: -200, width: "100%" }}
            data={data2}
            svg={{ stroke: "rgb(186,119,255)" }}
            contentInset={{ top: 20, bottom: 20 }}
          />
          </View>
      </View>
    );
  }
}
