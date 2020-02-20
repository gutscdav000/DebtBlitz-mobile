import React, { useState } from 'react';
import {Text, View, Button, StyleSheet, Image}  from 'react-native';
// redux 
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../Store/Actions';
// native-base
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';


const login = ( props ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = props.navigation;

  const submitCredentials = () => {
    // if credentials are valid
    props.requestHash(email, password);
    setPassword('');
  };

  const navigateHome = () => { 
    console.log('navigatehome')
    navigate('Home')
  }

  console.log('dev working')

  return (
    <View style={styles.backgroundView}>
      <View style={styles.formContainer}>
        <Item>
          <Input placeholder='email'/>
        </Item>
        <Item>
          <Input placeholder='password'/>
        </Item>
        <Button title="Login" onPress={navigateHome} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.token,
    };
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    requestHash: async (email, password) => {
      dispatch({type: actionTypes.AUTH_REQUESTED});
      let params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);

      axios.post(`http://localhost:8000/api/login/`, 
      params )
        .then(res => {
          console.log('res')
          console.log(res);
          dispatch({type: actionTypes.AUTH_RECEIVED, 
                               token: res.data.token,
                              email: email})
              })
        .catch(err => dispatch({type: actionTypes.AUTH_ERROR, 
                                error: err, 
                                email: email}));

    },
  };
};

const styles = StyleSheet.create({
  backgroundView: {
      height: '100%',
      width: '100%',
      display: 'flex'
      // backgroundColor: '#00E676'
  },
  formContainer: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    margin: 'auto',
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(login);