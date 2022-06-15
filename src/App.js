import styles from './App.module.css';
import Form from './components/Form';
import ListBooks from './components/ListBooks';



function App() {

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <Form />
        </div>
        <div className={styles.list}>
          <ListBooks />
        </div>
      </div>
    </>
  );
}

export default App;
