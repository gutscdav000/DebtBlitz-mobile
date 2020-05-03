import React, { Component } from 'react';
import { View, ImageBackground, Image, Button, StyleSheet, ScrollView}  from 'react-native';
// native base
import { Container, Content, List, ListItem, Text } from 'native-base';
//redux
import { connect } from 'react-redux';
import * as actionTypes from '../Store/Actions';
import axios from 'axios';
//accounting
import { formatMoney } from 'accounting';
// chart
import {Doughnut} from 'react-chartjs-2';
// custom 
import ClickableCardItem from '../Components/ClickableCardItem';

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
  
    getDoughnut = (accounts, bills, incomes) => {
  
      let data = {
        labels: ['accounts', 'bills', 'incomes'],
        datasets: [
          {
            label: 'Finances Snapshot',
            backgroundColor: ['#AAF255', '#EF4FA6', '#FFAF49'],
            borderColor: '#FFF',
            borderWidth: 2,
            data: [accounts, bills, incomes]
          }
        ]
      };
  
      return (
        <Doughnut
            data={data}
            options={{
              title:{
                display:false,
                text:'',
                fontSize:20
              },
              legend:{
                display:false,
                position:'right'
              }
            }}
          />
      );
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
      //   doughnut = this.getDoughnut(pctData.accountsPct, pctData.billsPct, pctData.incomesPct);
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
        <View>
            <View style={styles.imageContainer}>
              <Image 
                style={styles.image}
                source={require('../../assets/images/green-grass.jpg')} 
              >
              </Image>
            </View>
            <View>
              <ClickableCardItem />
            </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'red'
    },
    image: {
      // flex: 1
      borderWidth: 1,
      borderColor: 'blue'
    },
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