import styles from './DataInput.module.css'

const DataInput = ({ label, type, value, onChange }) => {
    return (
        <>
            <div className={styles['input-container']}>
                <div className={styles.label}>
                    <label />{label}
                </div>
                <div className={styles.input}>
                    <input
                        type={type}
                        min={type === 'number' ? 1 : null}
                        max={type === 'number' ? 5 : null}
                        value={value}
                        onChange={(value) => {
                            onChange(value.target.value)
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default DataInput;