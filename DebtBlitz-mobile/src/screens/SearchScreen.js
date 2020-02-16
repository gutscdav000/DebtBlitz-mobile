import React, {useState} from 'react';
import {Text, View, Button, StyleSheet, ScrollView}  from 'react-native';
import SearchBar from '../Components/SearchBar';
import useBusinessResults from '../hooks/useBusinessResults';
import ResultsList from '../Components/ResultsList';

const searchScreen = () => {    
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMsg] = useBusinessResults( );

    const filterResultsByPrice = (priceStr) => {
        return results.filter(result => result.price === priceStr);

    };
    return (
        <>
            <SearchBar 
                term={term} 
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)} />

            <Text>{
                   errorMsg === ''? 
                   `We have found ${results.length} results.`:
                    errorMsg
                   } 
            </Text>
            <ScrollView>
                <ResultsList 
                    title="Cost Effective"
                    results={filterResultsByPrice("$")}/>
                <ResultsList 
                    title="Bit Pricier"
                    results={filterResultsByPrice("$$")}/>
                <ResultsList 
                    title="Big Spender"
                    results={filterResultsByPrice("$$$")} />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({});

export default searchScreen;