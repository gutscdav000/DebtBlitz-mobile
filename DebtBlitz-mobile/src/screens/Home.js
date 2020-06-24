import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Button, StyleSheet, Dimensions }  from 'react-native';
// native base
import { Header, Container, Content, List, ListItem, Text } from 'native-base';
//redux
import { connect } from 'react-redux';
import * as actionTypes from '../Store/Actions';
import axios from 'axios';
//accounting
import { formatMoney } from 'accounting';
// custom 
import ClickableCardItem from '../Components/ClickableCardItem';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import DebtList from '../Components/DebtList';
const {width, height } = Dimensions.get("screen")
// charts
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';

// class Home extends Component { 
const home = props => {
  // const [state, setState] = useState({
  //   actionList : []
  // });
  
  useEffect(() => {
    props.onLoadAccounts(1, 'props.token', 'props.email');
    props.onLoadActions('gutscdav000', '');
    props.onLoadDebts('gutscdav000', '');
  }, []);
    
  // console.log(props.actionsList);
  


  return (
    <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
      <Header style={styles.header}>
        <LinearGradient
            colors={['#21CE99', '#04ff73']}
            start={[0.0, 0.0]}
            style={styles.image}
        >
          <View style={styles.outter}>
            <View style={styles.inner}>
              <Text style={{fontFamily: 'lato-bold', fontSize: 30, color: 'white'}}> Debts</Text>
              <Text style={{fontFamily: 'lato-regular', fontSize: 26, color: 'white'}}> $350.5k</Text>
            </View>
            <View style={styles.inner}> 
              <MaterialIcon
                name="monetization-on"
                size={72}
                color="white" 
              />
            </View>
            <View style={styles.inner}>
              <Text style={{fontFamily: 'lato-bold', fontSize: 30, color: 'white'}}> Assets</Text>
              <Text style={{fontFamily: 'lato-bold', fontSize: 26, color: 'white'}}> $3.5M</Text>
            </View>
          </View>
        </LinearGradient>
        </Header>
        <View style={styles.content} >    
        <ScrollView style={{marginTop: 40}}>
          <View style={styles.contentHeader}>
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {data: [
                      50000,
                      60000,
                      75000,
                      100000,
                      125000,
                      160000
                    ], color: (opacity = 1) => `rgb(33, 206, 153, ${opacity})`},
                    {data: [
                      150000,
                      175000,
                      200000,
                      250000,
                      300000,
                      375000
                    ], color: (opacity = 1) => `rgb(206, 62, 33, ${opacity})`},
                ],
                legend: ["with discretionary", "min payments"]
              }}
              width={width} 
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              withVerticalLabels={false}
              withHorizontalLabels={false}
              chartConfig={{
                backgroundColor: "#FFF",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(44, 80, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(25, 25, 25, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForBackgroundLines: {
                  strokeWidth: 0
                },
                propsForLabels: {
                  color: 'black',
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />  
          </View>                 
          <View style={styles.contentHeader}>
            <Text style={{fontFamily: 'lato-regular', fontSize: 25}}> Transaction Organizer</Text>
          </View>
          
          <DebtList actionsList={props.actionsList} />
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
    marginTop: -65,
    paddingTop: 60
  },
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    display: 'flex',      
    marginTop: 70,
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  outter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    // backgroundColor: 'black',
    // width: 150,
    padding: 10,
    color: 'white',
    fontSize: 30
  },
  contentHeader: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  }
})
  
const mapStateToProps = state => {
  return {
    actions: state.actions.actions,
    accounts: state.accounts.data,
    debts: state.debts.debts,
    // join actions and debts once api serves both requests
    actionsList: state.actions.actions === [] || 
                 state.debts.debts === [] || 
                 state.debts.debts === undefined ? [] : state.actions.actions.map((act, i) => {
      const newAction = {...act};
      // console.log(act)
      console.log(state.debts.debts.find((dbt) => dbt.id === act.debtId))
      const obj = state.debts.debts.find((dbt) => dbt.id === act.debtId);
      newAction.name = obj === undefined ? 'no name' : obj.name;
      return newAction
    }),
    loading: state.debts.loading,
    incomes: state.incomes.data,
    token: state.authentication.token,
    email: state.authentication.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadAccounts: async (userId, token, email) => {
      dispatch({type: actionTypes.ACCOUNTS_REQUESTED});
      if(userId === undefined || userId === null) { userId = 1}
      

      axios.get(`http://localhost:8000/api/accounts/${userId}`)//,{headers: {Authorization: 'Bearer ' + token}})
        .then(res => {
          // remove token from redux store when expired
          if(res.data.token === 'invalid') {
            dispatch({type: actionTypes.AUTH_RECEIVED, token: res.data.token})
          }
          dispatch({type: actionTypes.ACCOUNTS_RECEIVED, accountData: res})
        })
        .catch(err => dispatch({type: actionTypes.ACCOUNTS_ERROR, error: err}));
    },
    onLoadActions: async (username, token) => {
      dispatch({type: actionTypes.ACTIONS_REQUESTED});
      
      axios.get(`http://localhost:8080/action/${username}`)//, {headers: {Authorization: 'Bearer ' + token}})
        .then(res => dispatch({type: actionTypes.ACTIONS_RECEIVED, actions: res.data}))
        .catch(err => dispatch({type: actionTypes.ACTIONS_ERROR, error: err}))
    },
    onLoadDebts: async (username, token) => {
      dispatch({type: actionTypes.DEBTS_REQUESTED});

      axios.get(`http://localhost:8080/debt/${username}`)
        .then(res => dispatch({type: actionTypes.DEBTS_RECEIVED, debts: res.data}))
        .catch(err => dispatch({type: actionTypes.DEBTS_ERROR, error: err}))
    },
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(home);