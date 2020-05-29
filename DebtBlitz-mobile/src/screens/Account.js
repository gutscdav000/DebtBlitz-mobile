import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, ScrollView}  from 'react-native';
//redux
import { connect } from 'react-redux';
import * as actionTypes from '../Store/Actions';
import axios from 'axios';

class Account extends Component { 

 
    render() {
    //   const { classes } = this.props;
  
      return (
        <View>
            <Text> Account </Text>
        </View>
      );
    }
  }
  
  const mapStateToProps = (state) => {
  
    return {
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
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Account);