import styles from "../Properties.module.css";

interface Props {
    caption: string;
    type: string;
    value: number | string;
    onBlur: (value: number | string) => void;
}

export default function SingleInput({ value, caption, onBlur, type }: Props) {
    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{caption}</h4>
            <input
                className={styles.inputField}
                type={type}
                value={value}
                onBlur={(e) => onBlur(e.target.value)}
            />
        </div>
    );
}
