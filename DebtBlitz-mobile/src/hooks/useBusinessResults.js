import React, {useEffect, useState} from 'react';
import yelp from '../api/yelp';

 export default () => {
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const searchApi = async searchTerm => {
        try {
            const resp = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'columbus'
                }
            });
            setResults(resp.data.businesses);
        } catch(error) {
            console.log(error);
            setErrorMsg("something went wrong")
        }
    };

    useEffect(() => {
        searchApi('pasta');
    }, []);

    return [searchApi, results, errorMsg];
 };