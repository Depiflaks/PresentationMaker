import { useEffect, useState } from "react";
import styles from "../Properties.module.css";

interface Props {
    caption: string;
    type: string;
    value: string;
    onBlur: (value: string) => void;
}

export default function SingleInput({ value, caption, onBlur, type }: Props) {
    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (newValue: string) => {
        setLocalValue(newValue);
    };

    const handleBlur = (newValue: string) => {
        setLocalValue(newValue);
        onBlur(newValue);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{caption}</h4>
            <input
                className={styles.inputField}
                type={type}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={(e) => handleBlur(e.target.value)}
            />
        </div>
    );
}
