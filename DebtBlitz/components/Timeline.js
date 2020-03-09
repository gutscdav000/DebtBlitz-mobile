import React from "react";
import { View, Text, Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";

export default class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  renderTime(rowData) {
    var timeWrapper = null;
    timeWrapper = {
      alignItems: "flex-end"
    };

    let time = "";
    for (let i = 0; i < rowData.time.length; i++) {
      if (rowData.time[i] === ":") break;
      time = time + rowData.time[i];
    }
    time = parseInt(time);
    let period = time > 12 ? "PM" : "AM";
    time = time > 12 ? time - 12 : time;

    return (
      <View style={timeWrapper}>
        <View style={[{ minWidth: 45, marginTop: -6, alignItems: "center" }]}>
          <Text style={{ color: "black", fontSize: 20 }}>{time}</Text>
          <Text style={{ fontSize: 8 }}>{period}</Text>
        </View>
      </View>
    );
  }
  renderDetail(rowData) {
    let title = <Text style={{ color: "black" }}>{rowData.title}</Text>;
    var desc = null;
    var images = null;
    if (rowData.description) {
      desc = (
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 13, color: "#D8D8D8" }}>
            {rowData.description}
          </Text>
        </View>
      );
    } else {
      desc = <View style={{ marginTop: 5 }} />;
    }
    if (rowData.imageSrcList) {
      images = (
        <View style={{ flexDirection: "row" }}>
          {rowData.imageSrcList.map((item, index) => {
            return (
              <Image
                key={index}
                source={item}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                  marginTop: 10,
                  marginRight: 10
                }}
              />
            );
          })}
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingLeft: 20 }}>
          {title}
          {desc}
          {images}
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <Timeline
          data={this.props.data}
          lineWidth={0.66}
          lineColor={"#D8D8D8"}
          circleSize={8}
          timeStyle={{ marginTop: -4 }}
          detailContainerStyle={{ top: -14 }}
          renderDetail={this.renderDetail}
          renderTime={this.renderTime}
        />
      </View>
    );
  }
}
