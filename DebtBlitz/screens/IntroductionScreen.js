import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class IntroductionScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg-intro.png")}
          style={styles.image}
        >
          <View style={styles.row}>
            <Text style={styles.titleText}>Walkthrough</Text>
          </View>
          <View style={styles.row}>
            <Image source={require("../assets/icon.png")} style={styles.Logo} />
          </View>
          <View style={styles.row}>
            <Text style={{ color: "white" }}>
              The last task management app you
            </Text>
            <Text style={{ color: "white", fontWeight: "100" }}>
              you&#x27;ll ever need
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={{ flex: 0.4, alignItems: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              >
                <Text style={styles.skipButton}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.4,
                  alignItems: "center",
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "#FF3366",
                  backgroundColor: "#FF3366"
                }}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              >
                <Text style={styles.nextButton}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  },
  image: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "100",
    color: "white"
  },
  imageContainer: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center"
  },
  Logo: { height: 120, width: 120 },
  buttonContainer: {
    flex: 0.25,
    width: width
  },
  buttonView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  skipButton: {
    color: "white",
    borderWidth: 1,
    borderColor: "#FF3366",
    paddingLeft: width / 4 - 45,
    paddingRight: width / 4 - 45,
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15
  },
  nextButton: {
    color: "white",
    paddingLeft: width / 4 - 50,
    paddingRight: width / 4 - 50,
    paddingTop: 15,
    paddingBottom: 15
  }
});
