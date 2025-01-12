import styles from "../Properties.module.css";

interface Props {
    onChange: (value: string) => void;
    content: string;
    value: string;
}

export default function TextArea({ content, onChange, value }: Props) {
    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{content}</h4>
            <textarea
                className={styles.textareaField}
                defaultValue={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
