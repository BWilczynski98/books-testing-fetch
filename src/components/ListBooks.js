import { useContext } from "react";
import { GlobalStorage } from "../storage/Storage";
import styles from './ListBook.module.css';
import ItemBook from "./ItemBook";
import Button from "./Button";

const ListBooks = () => {
    const { bookManagement } = useContext(GlobalStorage);
    return (
        <div className={styles.container}>
            {/* <Button title={'fetch books'} onClick={bookManagement.getBookHandler} /> */}
            {bookManagement.books.map(book => <ItemBook
                title={book.title}
                author={book.author}
                releaseDate={book.releaseDate}
                rate={book.rate}
                id={book.id}
                key={book.id}
                bookManagement={bookManagement}
            />)}
        </div>
    );
}

export default ListBooks