import React, { useState } from 'react';
import {Text, View, Button, StyleSheet, Image}  from 'react-native';
// redux 
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../Store/Actions';
// native-base
import { Container, Header, Content,Item, Input, Icon } from 'native-base';


const login = ( props ) => {
  const [email, setEmail] = useState({
    value: '',
    valid: false,
    touched: false
  });
  const [password, setPassword] = useState('');
  const { navigate } = props.navigation;

  const submitCredentials = () => {
    // if credentials are valid
    props.requestHash(email, password);
    setPassword('');
  };

  const handleEmailChange = (text) => {
    const newEmail = {...email};
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const isValid = pattern.test(text)
    newEmail.valid = isValid;
    newEmail.touched = true;
    newEmail.value = text;
    setEmail(newEmail);
  }


  return (
    // <View style={styles.backgroundView}>
      <Container style={styles.backgroundView}>
        {/* <Header /> */}
        <View style={styles.filler}/>
        <Content style={styles.formContainer}>
        <Item key="email">
          <Input 
            value={email.value}
            onChangeText={text => handleEmailChange(text)}
            placeholder='email'
            error={email.touched && !email.valid}
            success={email.touched && email.valid}/>
          <Icon name='close-circle' />
        </Item>
        <Item key="pass">
          <Input placeholder='password'/>
          <Icon name='close-circle' />
        </Item>
        <Button title="Login" onPress={() => navigate('Home')} />
        </Content>
      </Container>
    // </View>
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
      // height: '100%',
      // width: '100%',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center'
      // backgroundColor: '#00E676'
      // borderWidth: 1,
      // borderColor: 'blue',
  },
  formContainer: {
    // width: '90%',
    borderWidth: 1,
    borderColor: 'red',
    // margin: 'auto'
  },
  filler: {
    height: 100
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(login);