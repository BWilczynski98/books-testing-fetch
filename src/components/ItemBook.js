import styles from './ItemBook.module.css';
const ItemBook = ({ title, author, releaseDate, rate, id, bookManagement }) => {
    return (
        <>
            <div className={styles.container}>
                <div>
                    <h4 className={styles.title}>{title}</h4>
                </div>
                <div className={styles['rest-info']}>
                    <p>Author: {author}</p>
                    <p>Date: {releaseDate}</p>
                    <p>Rate: {rate}</p>
                </div>
                <div>
                    <h4 className={styles.delete} onClick={() => {
                        bookManagement.deleteBook(id)
                    }}>DELETE</h4>
                </div>
            </div>
        </>
    );
}

export default ItemBook;