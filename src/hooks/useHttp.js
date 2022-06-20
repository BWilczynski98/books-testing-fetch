import React, { useCallback, useState } from 'react';

const useHttp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const request = useCallback(async (requestProperties, applyData) => {
        console.log('Start render request');
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(requestProperties.url,
                {
                    method: requestProperties.method ? requestProperties.method : 'GET',
                    headers: requestProperties.headers ? requestProperties.headers : {},
                    body: requestProperties.body ? JSON.stringify(requestProperties.body) : null,
                }
            );

            if (!response.ok) throw new Error('Request failed!')

            const data = await response.json();
            applyData(data)
        } catch (error) {
            setError(error.message || 'Something went wrong!')
        }
        setIsLoading(false)
        console.log('Finished render request');
    }, []);

    return {
        error,
        isLoading,
        request
    }


};

export default useHttp;