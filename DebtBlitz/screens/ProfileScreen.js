import React from "react";
import { StyleSheet, Image, Dimensions, View, ScrollView } from "react-native";
import {
  Container,
  Header,
  Body,
  Text,
  Left,
  Button,
  Right,
  Icon
} from "native-base";
import ProgressCircle from "../components/ProgressCircle";
import ScrollableTabs from "../components/ScrollableTabs";

const { width, height } = Dimensions.get("window");
const tasks = [
  {
    title: "Finish Home Screen",
    subtitle: "Web App",
    status: "completed",
    time: "8:00",
    people: []
  },
  {
    title: "Lunch Break",
    subtitle: "",
    status: "completed",
    time: "11:00",
    people: []
  },
  {
    title: "Design Meeting",
    subtitle: "Hangouts",
    status: "snoozed",
    time: "14:00",
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
  },
  {
    title: "Design Meeting",
    subtitle: "Hangouts",
    status: "snoozed",
    time: "14:00",
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

const data = [
  {
    month: "January",
    year: "2019",
    tasks: tasks
  },
  {
    month: "February",
    year: "2019",
    tasks: tasks
  },
  {
    month: "March",
    year: "2019",
    tasks: tasks
  },
  {
    month: "April",
    year: "2019",
    tasks: tasks
  }
];

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  goPrevious(index) {
    if (index != 0) {
      this.listView.scrollTo({ x: (index - 1) * width });
    }
  }

  goToNext(index) {
    if (index != data.length - 1) {
      this.listView.scrollTo({ x: (index + 1) * width });
    }
  }

  render() {
    console.log('render profile')
    return (
      <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={require("../assets/bg-groups.png")}
          style={styles.bgImage}
        />
        <Header style={styles.header}>
          <Left>
            <Button
              active={true}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
              transparent
            >
              <Icon style={styles.Icon} name="menu" />
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent>
              <Image
                source={require("../assets/avatar.png")}
                style={{ height: 25, width: 25 }}
              />
            </Button>
          </Right>
        </Header>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 30, color: "white" }}>Adam Lane</Text>
          <Text style={{ fontSize: 10, color: "#D8D8D8" }}>Photographer</Text>

          <View style={styles.progress}>
            <View>
              {/* <ProgressCircle tintColor="#FCAB53" fill={16} /> */}
              <Text style={styles.progressText}>SNOOZED</Text>
            </View>
            <View>
              {/* <ProgressCircle tintColor="#50D2C2" fill={74} /> */}
              <Text style={styles.progressText}>COMPLETED</Text>
            </View>
            <View>
              {/* <ProgressCircle tintColor="#BA77FF" fill={10} /> */}
              <Text style={styles.progressText}>OVERDUE</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.content}
          ref={ref => (this.listView = ref)}
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => {
            return (
              <ScrollableTabs
                key={index}
                tasks={item.tasks}
                month={item.month}
                year={item.year}
                index={index}
                goPrevious={index => {
                  this.goPrevious(index);
                }}
                goToNext={index => {
                  this.goToNext(index);
                }}
              />
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
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
  progress: {
    marginTop: 30,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressText: {
    color: "#D8D8D8",
    marginTop: 10,
    fontSize: 10,
    alignSelf: "center"
  },
  content: {
    marginTop: 20,
    backgroundColor: "white",
    flex: 1
  },
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
  avatar: { height: 25, width: 25, marginRight: 10 }
});
