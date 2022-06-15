import styles from './Button.module.css'

const Button = ({ title, type, formId, onClick }) => {
    return (
        <>
            <div className={styles.container}>
                <button
                    type={type ? type : null}
                    form={formId ? formId : null}
                    onClick={onClick ? () => onClick() : null}
                >{title}</button>
            </div>
        </>
    );
}

export default Button;