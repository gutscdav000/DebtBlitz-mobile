import React, { useState } from 'react';
import { Button, Text, Accordion, Item, Input, InputGroup, Picker, CheckBox} from 'native-base';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window"); 

const clickableCardItem = props => {
    const [ state, setState ] = useState({
        paid: true,
        value: 0,
        expanded: 0,
        dataArray: [
            { title: "David's monthly Income", value: 6000.00, },
            { title: "Monthly Expenses", value: -2000.00, },
            { title: "Transfer Checking to Life Insurance", value: -1500.00, }
        ],
    });

    const handleSubmission = (item) => {
        const newDataArray = state.dataArray.filter(el => el.title !== item.title &&
                                         el.value !== item.value);
        setState({
            ...state,
            dataArray: newDataArray,
        });
    }

    const handleOtherAmount = (text, item) => {
        const itemValue = +item.value < 0 ? +item.value * -1 : +item.value;
        if(+text !== itemValue) {
            setState({paid: false, value: text}); 
        } else {
            setState({paid: true, value: text}); 
        }
    }


    const renderHeader = (item, expanded) => {
        if(expanded && state.value === 0 && +item.value !== 0) {
            console.log('if')
            setState({
                ...state,
                value: +item.value,
            })
        }
        
        return (
            <View style={styles.renderHeader}>
                <Text style={styles.text}>
                    {" "}{item.title}
                </Text>
                <Button style={item.value >= 0.0 ? styles.buttonPlus : styles.buttonMinus} >
                    <Text>{ item.value >= 0.0 ? item.value : -1 * item.value }</Text>
                </Button>            
            </View>
        );
    }
    const renderContent = (item) => {
        
        return (
        <View style={styles.renderContent}>
            <View>
                <View>
                    <Item style={{marginBottom: 20}}>
                        <MaterialIcon
                            name="attach-money"
                            size={25}
                            color="black" 
                        />
                        <Input 
                            onChangeText={text => handleOtherAmount(text, item)}
                            placeholder="Other Amount"
                            value={state.value.toString()}    
                        />
                    </Item>
                </View>
                <View style={styles.formButtonView}>
                    <Button
                        onPress={() => setState({...state, paid:!state.paid})}
                        style={state.paid ? styles.paidButtonOn :styles.paidButtonOff}
                    >
                        <Text> Paid in Full</Text>
                    </Button>
                    <Button 
                        style={styles.paidButtonOn}
                        onPress={() => handleSubmission(item)} >
                        <Text> submit </Text>
                    </Button>
                </View>
          </View>
        </View>
    );
        }

        return (
            <ScrollView>
                <Accordion
                    dataArray={state.dataArray}
                    expanded
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                />
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    renderContent: {
        backgroundColor: "#eee",
        padding: 10,
    },
    renderHeader: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between",
        alignItems: "center" ,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    text: {
        fontFamily: 'lato-regular',
        fontSize: 20,
    },
    buttonPlus: {
        backgroundColor: '#21CE99',
        height: 35,
    },
    buttonMinus: {
        backgroundColor: '#CE3E21',
        height: 35,
    },
    paidButtonOn: {
        height: 35, 
        backgroundColor: '#21CE99',
        margin: 2,
    },
    paidButtonOff: {
        height: 35, 
        backgroundColor: '#AAA',
        borderWidth: 2,
        borderColor: '#21CE99',
        margin: 2,
    },
    formButtonView: {
        width: 120,
        display: 'flex',
        flexDirection: 'row',
    },

});

export default clickableCardItem;