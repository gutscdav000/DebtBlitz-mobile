import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import { Container, Text } from "native-base";
import CarouselComponent from "../components/CarouselComponent";
import HeaderSearch from "../components/HeaderSearch";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");
const cards = [
  {
    text: "Grocery",
    name: "One",
    image: require("../assets/grocery.jpg")
  },

  {
    text: "Places",
    name: "Two",
    image: require("../assets/bg-app.png")
  },
  {
    text: "Movies",
    name: "Three",
    image: require("../assets/movies.jpg")
  }
];
export default class GroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  changeIndex = index => {
    this.setState({ activeSlide: index });
  };

  render() {
    let progress = (this.state.activeSlide + 1) / cards.length;
    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
        <HeaderSearch navigation={this.props.navigation} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 30, color: "white" }}>Groups</Text>
        </View>
        <CarouselComponent items={cards} changeIndex={this.changeIndex} />
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 20
          }}
        >
          <Progress.Bar
            progress={progress}
            width={200}
            height={2}
            color={"#D8D8D8"}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)"
  }
});
