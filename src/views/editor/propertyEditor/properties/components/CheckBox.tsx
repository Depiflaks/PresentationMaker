import styles from "../Properties.module.css";

interface Props {
    caption: string;
    subCaption: string;
    onChange: (value: boolean) => void;
    value: boolean;
}

export default function CheckBox({ value, onChange, caption, subCaption }: Props) {
    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{caption}</h4>
            <label className={styles.checkboxContainer}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={styles.labelText}>{subCaption}</span>
            </label>
        </div>
    );
}
