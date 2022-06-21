import React, { useState } from 'react';
import axios from 'axios'

export const useAxios = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const transformResponse = (response) => {
        const transformResponseArray = []
        for (const key in response) {
            transformResponseArray.push(
                {
                    id: key,
                    title: response[key].title,
                    author: response[key].author,
                    releaseDate: response[key].releaseDate,
                    rate: response[key].rate,
                }
            );
        };
        setResponse(transformResponseArray)
    };

    const fetchData = async (params) => {
        try {
            const result = await axios.request(params);
            params.method !== 'DELETE' && transformResponse(result.data)
        } catch (error) {
            setError(error.message || 'Something went wrong!')
        } finally {
            setLoading(false)
        }

    };

    return { response, error, loading, fetchData, setLoading };
};