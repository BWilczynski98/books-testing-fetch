import React, { createContext, useState, useEffect, useCallback } from 'react';
export const GlobalStorage = createContext();




// ? https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
// const reducerFunction = (state, action) => {
//     console.log('Reducer run');
//     switch (action.type) {
//         case ACTION.ADD:
//             console.log('case run');
//             const movie = {
//                 title: action.payload.title,
//                 author: action.payload.author,
//                 releaseDate: action.payload.releaseDate,
//                 rate: action.payload.rate
//             };
//             return addMovieHandler(movie);
//         default:
//             console.log('default');
//             return null;
//     }
// }

export const Storage = ({ children }) => {
    const [books, setBooks] = useState([]);

    const addBookHandler = async (book) => {
        console.log(book);
        const response = await fetch('https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books.json', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);


    }

    const getBookHandler = useCallback(async () => {
        const response = await fetch('https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books.json');
        const data = await response.json();
        const loadedBooks = [];

        for (const key in data) {
            loadedBooks.push(
                {
                    id: key,
                    title: data[key].title,
                    author: data[key].author,
                    releaseDate: data[key].releaseDate,
                    rate: data[key].rate
                }
            );
        }
        setBooks(loadedBooks)
    });

    const deleteBook = useCallback((id) => {
        fetch(`https://react-test-e9c4d-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`, { method: 'DELETE' }).then(res => res.json()).then(() => getBookHandler());

    })


    useEffect(() => {
        getBookHandler();
    }, [getBookHandler])
    const values = {
        bookManagement: {
            addBookHandler,
            getBookHandler,
            deleteBook,
            books,
        }
    }
    return (
        <GlobalStorage.Provider value={values}>
            {children}
        </GlobalStorage.Provider>
    );
}

