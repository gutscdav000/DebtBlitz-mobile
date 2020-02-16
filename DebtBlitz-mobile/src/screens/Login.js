import React, { useState } from 'react';
// import {Text, View, Button, StyleSheet, ScrollView}  from 'react-native';
// redux 
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../Store/Actions';
// react-native-paper
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { View } from 'react-native';

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
      <Appbar>
        <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
        <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
      </Appbar>
      <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button icon="camera">Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
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