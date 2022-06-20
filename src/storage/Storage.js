import React, { createContext, useState, useEffect, useCallback } from 'react';
import useHttp from '../hooks/useHttp';
export const GlobalStorage = createContext();


export const Storage = ({ children }) => {
    const [books, setBooks] = useState([]);
    const { error, isLoading, request } = useHttp();

    const transformData = book => {
        const loadedBooks = [];
        for (const key in book) {
            loadedBooks.push(
                {
                    id: key,
                    title: book[key].title,
                    author: book[key].author,
                    releaseDate: book[key].releaseDate,
                    rate: book[key].rate
                }
            );
        };
        console.log('transformData');
        setBooks(loadedBooks)
    };

    const addBookHandler = async book => {
        await fetch('https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books.json', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-type': 'application/json',
            }
        });
        await getBookHandler();
    };

    const getBookHandler = async () => {
        const response = await fetch('https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books.json');
        const data = await response.json();
        await transformData(data)
        console.log(response);
    };

    const deleteBook = async (id) => {
        await fetch(`https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`, { method: 'DELETE' });
        await getBookHandler()
    };



    console.log(books);
    const values = {
        bookManagement: {
            addBookHandler,
            getBookHandler,
            deleteBook,
            books,
        }
    };

    return (
        <GlobalStorage.Provider value={values}>
            {children}
        </GlobalStorage.Provider>
    );
}

