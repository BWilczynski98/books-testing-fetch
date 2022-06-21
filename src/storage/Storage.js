import React, { createContext, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';
export const GlobalStorage = createContext();


export const Storage = ({ children }) => {
    const { response, error, loading, fetchData, setLoading } = useAxios();


    const getBookHandler = async () => {
        await fetchData({
            method: 'GET',
            url: 'https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books.json',
        })
    };

    const addBookHandler = async book => {
        await setLoading(true);
        await fetchData({
            method: 'POST',
            url: 'https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books.json',
            data: book
        });
        await getBookHandler();
    };

    const deleteBook = async (id) => {
        console.log(id);
        await fetchData({
            method: 'DELETE',
            url: `https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
        })
        await getBookHandler();
    };

    useEffect(() => {
        getBookHandler();
        const download = setInterval(() => {
            console.log('interval');
            getBookHandler();
        }, 5000);
        return () => clearInterval(download);
    }, []);

    const values = {
        bookManagement: {
            addBookHandler,
            getBookHandler,
            deleteBook,
            response,
            error,
            loading,
        },
    };

    return (
        <GlobalStorage.Provider value={values}>
            {children}
        </GlobalStorage.Provider>
    );
}

