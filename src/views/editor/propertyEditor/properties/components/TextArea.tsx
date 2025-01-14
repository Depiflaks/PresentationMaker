import { useEffect, useState } from "react";
import styles from "../Properties.module.css";

interface Props {
    onChange: (value: string) => void;
    content: string;
    value: string;
}

export default function TextArea({ content, onChange, value }: Props) {
    const [localValue, setLocalValue] = useState(value);
        
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (newValue: string) => {
        setLocalValue(newValue);
    };

    const handleBlur = (newValue: string) => {
        setLocalValue(newValue);
        onChange(newValue);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{content}</h4>
            <textarea
                className={styles.textareaField}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={(e) => handleBlur(e.target.value)}
            />
        </div>
    );
}
