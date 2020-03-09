import React from "react";
import { Text } from "native-base";
import { FlatList, View, Image, TouchableOpacity } from "react-native";

export default class MonthTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          time: "JAN",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "FEB",
          timeFrame: "",
          title: "Design Meeting",
          subtitle: "Hangouts",
          bgColor: "#BA77FF",
          repeat: true
        },
        {
          time: "MARCH",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "APRIL",
          timeFrame: "",
          title: "Lunch Break",
          subtitle: "",
          bgColor: "#50D2C2",
          repeat: false
        },
        {
          time: "MAY",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "JUNE",
          timeFrame: "",
          title: "Catch up with Tom",
          subtitle: "",
          bgColor: "#FCAB53",
          repeat: false
        },
        {
          time: "JULY",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "AUG",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "SEP",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "OCT",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "NOV",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        },
        {
          time: "DEC",
          timeFrame: "",
          title: "",
          subtitle: "",
          bgColor: "",
          repeat: false
        }
      ]
    };
  }
  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item }) => {
    let image;
    if (item.repeat) {
      image = (
        <Image
          source={require("../assets/repeat.png")}
          style={{ height: 20, width: 20 }}
        />
      );
    } else {
      image = <View />;
    }
    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#D8D8D8",
          flexDirection: "row"
        }}
        activeOpacity={1}
        disabled={item.title ? false : true}
        onPress={() => {
          if (item.title) {
            this.props.navigation.navigate("TaskEditor", item);
          }
        }}
        transparent
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 0.2,
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Text style={{ fontSize: 15 }}>{item.time}</Text>
          <Text style={{ fontSize: 10 }}>{item.timeFrame}</Text>
        </View>
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            backgroundColor: item.bgColor
          }}
        >
          <View style={{ paddingTop: 10, paddingLeft: 10, flex: 0.9 }}>
            <Text style={{ color: "white", fontSize: 12 }}>{item.title}</Text>
            <Text style={{ color: "white", fontSize: 10 }}>
              {item.subtitle}
            </Text>
          </View>
          <View style={{ flex: 0.1, paddingTop: 20 }}>{image}</View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <FlatList
        data={this.state.list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
