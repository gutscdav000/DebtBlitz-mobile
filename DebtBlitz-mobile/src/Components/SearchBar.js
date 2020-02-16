import React from 'react';
import {Text, TextInput,  View, Button, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

//icons: https://expo.github.io/vector-icons/
const searchBar = ({ term, onTermChange, onTermSubmit }) => {

    return (
        <View style={styles.backgroundStyle}>
            <Ionicons name="ios-search" style={styles.iconStyle} />
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input} 
                placeholder="Search"
                value={term}
                onChangeText={newTerm => onTermChange(newTerm)}
                onEndEditing={() =>  onTermSubmit()}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        flexDirection: "row",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    input: {
        // borderColor: 'black', this was used to see boundaries of object
        // borderWidth: 1,
        flex: 1,
        fontSize: 18,
    },
    iconStyle : {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 10,
    }
});

export default searchBar;