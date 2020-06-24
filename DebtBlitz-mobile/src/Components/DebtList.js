import React from 'react';
import {  StyleSheet, Dimensions }  from 'react-native';
// native base
import { List, ListItem, Text } from 'native-base';
//redux
// custom 
import ClickableCardItem from '../Components/ClickableCardItem';
const {width, height } = Dimensions.get("screen")

const monthLst = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const debtList = props => {
    let month = new Date().getMonth();

    let sortedActions = props.actionsList.sort((a, b) => {
        let aSplt = a.payDate.split('-')
        let aDt = new Date(+aSplt[0], +(aSplt[1]) - 1, aSplt[2]);
        let bSplt = b.payDate.split('-')
        let bDt = new Date(+bSplt[0], +(bSplt[1]) - 1, bSplt[2]);
        return aDt - bDt;
    });
    // console.log(sortedActions);
    let nestedActions = [], nest = [], lastMon = null, tmpMon;

    for(let i = 0; i < sortedActions.length; i++) {
        tmpMon = sortedActions[i].payDate.split('-')[1];
            if(lastMon !== null && tmpMon !== lastMon) {
                lastMon = tmpMon;
                nestedActions.push(nest);
                nest = [];
                continue;
            }
        nest.push(sortedActions[i]);
        lastMon = tmpMon;
    }
    console.log(nestedActions);
    return (
        <List>
            {
                nestedActions.map((actionList, i) => (
                    <React.Fragment key={'B' + (month + i)}>
                        <ListItem itemDivider key={'A' + (month + i)}>
                            <Text style={{fontFamily: 'lato-regular', fontSize: 22}}>{monthLst[(i + month ) % 12]}</Text>
                        </ListItem>
                        <ClickableCardItem actions={actionList} />
                    </React.Fragment>
                ))
            }
        </List>
    );
};

export default debtList;
/* <ListItem itemDivider >
                <Text style={{fontFamily: 'lato-regular', fontSize: 22}}>may</Text>
            </ListItem>
            <ClickableCardItem />
            <ListItem itemDivider>
                <Text style={{fontFamily: 'lato-regular', fontSize: 22}}>june</Text>
            </ListItem>
            <ClickableCardItem /> */