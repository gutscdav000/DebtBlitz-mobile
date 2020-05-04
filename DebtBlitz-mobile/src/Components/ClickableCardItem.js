import React from 'react';
import { Card, CardItem, Text, List, ListItem, Accordion } from 'native-base';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';


const clickableCardItem = props => {
    const renderHeader = (item, expanded) => (
        <View style={styles.renderHeader}>
        <Text style={styles.text}>
            {" "}{item.title}
            </Text>
            {expanded
            ? <Icon name="minus"size={40} />
            : <Icon name="plus"size={40} />}
        </View>
    );

    const renderContent = (item) => (
        <View style={styles.renderContent}>
            <Text >
                {item.content}
            </Text>
        </View>
    );
    
        const dataArray = [
            { title: "Income", content: "Lorem ipsum dolor sit amet" },
            { title: "Expense", content: "Lorem ipsum dolor sit amet" },
            { title: "Transfer", content: "Lorem ipsum dolor sit amet" }
        ];

        return (
            <ScrollView>
                <Accordion
                    dataArray={dataArray}
                    animation
                    expanded
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                />
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    renderContent: {
        backgroundColor: "#e3f1f1",
        padding: 10,
    },
    renderHeader: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between",
        alignItems: "center" ,
        // backgroundColor: "#A9DAD6",
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    text: {
        fontFamily: 'lato-regular',
        fontSize: 20,
    }
});

export default clickableCardItem;