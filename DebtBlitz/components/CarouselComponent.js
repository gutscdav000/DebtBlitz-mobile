import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
export default class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  _renderItem({ item, index }) {
    return (
      <View key={index} style={styles.slide}>
        <View style={{ flex: 0.7 }}>
          <Image
            source={item.image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 0.3,
            justifyContent: "center"
          }}
        >
          <Text>
            {this.state.index + 1}/{this.props.items.length}
          </Text>
          <Text style={{ fontSize: 25, color: "black" }}>{item.text}</Text>
          <Image
            source={require("../assets/category.png")}
            style={{ height: 7, width: 7, marginTop: 10 }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={"default"}
          data={this.props.items}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={width}
          itemWidth={width}
          loop={true}
          onSnapToItem={index => {
            this.props.changeIndex(index);
            this.setState({ index: index });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 40,
    flex: 0.8,
    alignSelf: "center"
  },
  slide: {
    backgroundColor: "white",
    width: "70%",
    flex: 1,
    alignSelf: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
