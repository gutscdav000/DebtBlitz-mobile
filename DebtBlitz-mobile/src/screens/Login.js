import React, { useState } from 'react';
import {Text, View, Button, StyleSheet, ScrollView}  from 'react-native';
// redux 
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../Store/Actions';
// react-native-elements
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


const login = ( props ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitCredentials = () => {
    // if credentials are valid
    props.requestHash(email, password);
    setPassword('');
  };

//   if( props.isAuthenticated ) {
//       return (<Redirect to='/' />)
//   }

  return (
    <View>
        <Input
            placeholder='Email'
            leftIcon={
                <Icon
                name='user'
                size={28}
                color='black'
                />
        }
        />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(login);