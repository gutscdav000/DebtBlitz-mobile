import React from "react";
import { ScrollView, Dimensions } from "react-native";
import Scrollable from "../components/Scrollable";

const { width } = Dimensions.get("window");
const tabs = [
  {
    month: "January",
    year: "2019",
    data: {
      completed: 54,
      snoozed: 37,
      overdue: 12
    }
  },
  {
    month: "February",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "March",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "April",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "May",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "June",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "July",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "August",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "September",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "October",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "November",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  },
  {
    month: "December",
    year: "2019",
    data: {
      completed: 21,
      snoozed: 13,
      overdue: 5
    }
  }
];
export default class MonthlyTab extends React.Component {
  constructor(props) {
    super(props);
  }
  goPrevious(index) {
    if (index != 0) {
      this.listView.scrollTo({ x: (index - 1) * width });
    }
  }

  goToNext(index) {
    if (index != tabs.length - 1) {
      this.listView.scrollTo({ x: (index + 1) * width });
    }
  }
  render() {
    return (
      <ScrollView
        horizontal={true}
        scrollEnabled={false}
        ref={ref => (this.listView = ref)}
      >
        {tabs.map((item, index) => {
          return (
            <Scrollable
              key={index}
              month={item.month}
              year={item.year}
              data={item.data}
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
    );
  }
}
