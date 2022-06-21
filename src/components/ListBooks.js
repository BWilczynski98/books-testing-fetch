import { useContext } from "react";
import { GlobalStorage } from "../storage/Storage";
import styles from './ListBook.module.css';
import ItemBook from "./ItemBook";
import Button from "./Button";

const ListBooks = () => {
    const { bookManagement } = useContext(GlobalStorage);
    const { response, error } = bookManagement;
    console.log(response);
    return (
        <div className={styles.container}>
            {!error ? response.map(book => <ItemBook
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                releaseDate={book.releaseDate}
                rate={book.rate}
                bookManagement={bookManagement}
            />) : <h3 className={styles.error}>{error}</h3>}
        </div>
    );
}

export default ListBooks