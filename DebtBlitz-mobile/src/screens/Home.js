import React, { Component } from 'react';
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
import { withOrientation } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
const {width, height } = Dimensions.get("screen")
// charts
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';

class Home extends Component { 

    componentDidMount() {
      this.props.onLoadAccounts(1, this.props.token, this.props.email);
      this.props.onLoadBills(1, this.props.token, this.props.email);
      this.props.onLoadIncomes(1, this.props.token, this.props.email);
    }
  
    computePercentages = (accounts, bills, incomes) => {
  
      const actSum = accounts.reduce((sum, item) => {
        return sum + item.value;
      }, 0.0).toFixed(2);
  
      const billSum = bills.reduce((sum, item) => {
        return sum + item.value;
      }, 0.0).toFixed(2);
  
      const incomeSum = incomes.reduce((sum, item) => {
        return sum + item.value;
      }, 0.0).toFixed(2);
  
  
      let sum = +actSum + +billSum + +incomeSum;
      let actPct = (actSum / sum) * 100;
      let billPct = (billSum / sum) * 100;
      let incPct = (incomeSum / sum) * 100;
  
      return {
        accountsTot: actSum,
        billsTot: billSum,
        incomesTot: incomeSum,
        accountsPct: actPct.toFixed(2),
        billsPct: billPct.toFixed(2),
        incomesPct: incPct.toFixed(2)
      };
    }


    renderTabBar() {
      return <StatusBar hidden/>
    }
  
    render() {
    //   const { classes } = this.props;
  
      // const accounts = this.props.accounts &&
      //                  this.props.accounts.status === 200 ?
      //         this.props.accounts.data.accounts : [];
      // const bills = this.props.bills &&
      //               this.props.bills.status === 200 &&
      //               this.props.bills.data &&
      //               this.props.bills.data.bills ?
      //     this.props.bills.data.bills : [];
  
      // const incomes = this.props.incomes &&
      //                 this.props.incomes.status === 200 &&
      //                 this.props.incomes.data &&
      //                 this.props.incomes.data.incomes ?
      //     this.props.incomes.data.incomes : [];
  
      // let pctData, doughnut;
      // let accountsTotal = 0.0, billsTotal = 0.0, incomesTotal = 0.0;
      // let accountsPct = 0.0, billsPct = 0.0, incomesPct = 0.0;
      // if(accounts !== [] && accounts !== undefined && accounts !== null
      //    && bills !== [] && bills !== undefined && bills !== null
      //    && incomes !== [] && incomes !== undefined && incomes !== null) {
      //   pctData = this.computePercentages(accounts, bills, incomes);
      //   accountsTotal =formatMoney(pctData.accountsTot);
      //   billsTotal = formatMoney(pctData.billsTot);
      //   incomesTotal = formatMoney(pctData.incomesTot);
      //   accountsPct = pctData.accountsPct;
      //   billsPct = pctData.billsPct;
      //   incomesPct = pctData.incomesPct;
      // }
      
      const accounts = [
        {name: 'test 1', value: 5000.00},
        {name: 'test 2', value: 15000.00},
        {name: 'test 3', value: 200.00},
      ];

      return (
        accounts === [] /*&& bills === [] && incomes === []*/ ? 
        <View>loading</View>
        :
        <Container style={styles.container} contentContainerStyle={{ flex: 1 }}>
          <Header style={styles.header}>
            {/* <ImageBackground style={styles.image} source={require('../../assets/images/shades-of-green.jpg')}> */}
            <LinearGradient
                // colors={['#04ff73', '#03fbc0', '#00d05c']}
                // start={[0.15, 0.35, 0.75]}
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
            {/* </ImageBackground> */}
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
              
              <List>
                <ListItem itemDivider >
                  <Text style={{fontFamily: 'lato-regular', fontSize: 22}}>may</Text>
                </ListItem>
              <ClickableCardItem />
              <ListItem itemDivider>
              <Text style={{fontFamily: 'lato-regular', fontSize: 22}}>june</Text>
              </ListItem>
              <ClickableCardItem />
              </List>
            </ScrollView>
          </View>
        </Container>
      );
    }
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
  
  const mapStateToProps = (state) => {
  
    return {
      accounts: state.accounts.data,
      bills: state.bills.data,
      loading: state.bills.loading && state.incomes.loading && state.accounts.loading,
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
        

        axios.get(`http://localhost:8000/api/accounts/${userId}`,{headers: {Authorization: 'Bearer ' + token}})
          .then(res => {
            // remove token from redux store when expired
            if(res.data.token === 'invalid') {
              dispatch({type: actionTypes.AUTH_RECEIVED, token: res.data.token})
            }
            dispatch({type: actionTypes.ACCOUNTS_RECEIVED, accountData: res})
          })
          .catch(err => dispatch({type: actionTypes.ACCOUNTS_ERROR, error: err}));
      },
      onLoadBills: async (userId, token, email) => {
        dispatch({type: actionTypes.BILLS_REQUESTED});
        if(userId === undefined || userId === null) { userId = 1}
        
        // const headers = {
        //   UserEmail: email,
        //   UserToken: token,
        // };
        axios.get(`http://localhost:8000/api/bills/${userId}`, {headers: {Authorization: 'Bearer ' + token}})
          .then(res => {
            // remove token from redux store when expired
            if(res.data.token === 'invalid') {
              dispatch({type: actionTypes.AUTH_RECEIVED, token: res.data.token})
            }
            dispatch({type: actionTypes.BILLS_RECEIVED, billData: res})
          })
          .catch(err => dispatch({type: actionTypes.BILLS_ERROR, error: err}));
      },
      onLoadIncomes: async (userId, token, email) => {
        dispatch({type: actionTypes.INCOMES_REQUESTED});
        if(userId === undefined || userId === null) { userId = 1}
        
        axios.get(`http://localhost:8000/api/incomes/${userId}`, {headers: {Authorization: 'Bearer ' + token}})
          .then(res => {
            // remove token from redux store when expired
            if(res.data.token === 'invalid') {
              dispatch({type: actionTypes.AUTH_RECEIVED, token: res.data.token})
            }
            dispatch({type: actionTypes.INCOMES_RECEIVED, incomeData: res})
          })
          .catch(err => dispatch({type: actionTypes.INCOMES_ERROR, error: err}));
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);