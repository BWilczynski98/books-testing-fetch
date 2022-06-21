import React, { useState, useContext } from 'react';
import DataInput from './DataInput';
import Button from './Button';
import styles from './Form.module.css'
import { GlobalStorage } from '../storage/Storage';

const Form = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [releaseDate, setDate] = useState('')
    const [rate, setRate] = useState('')
    const { bookManagement } = useContext(GlobalStorage)


    const inputReset = () => {
        setTitle('');
        setAuthor('');
        setDate('');
        setRate('');
    }

    const submitBook = (e) => {
        console.log('submitBook');
        e.preventDefault();
        const book = {
            title,
            author,
            releaseDate,
            rate
        };

        bookManagement.addBookHandler(book);
        inputReset();
    }

    const formId = 'getData'
    return (
        <>
            <form onSubmit={submitBook} id={formId} className={styles.container}>
                <DataInput label={'title'} type={'text'} value={title} onChange={setTitle} />
                <DataInput label={'author'} type={'text'} value={author} onChange={setAuthor} />
                <DataInput label={'release date'} type={'text'} value={releaseDate} onChange={setDate} />
                <DataInput label={'rate (between 1 - 5'} type={'number'} value={rate} onChange={setRate} />
                <Button title={bookManagement.loading ? 'loading...' : 'add book'} type={'submit'} form={formId} />
            </form>

        </>
    );
}

export default Form;