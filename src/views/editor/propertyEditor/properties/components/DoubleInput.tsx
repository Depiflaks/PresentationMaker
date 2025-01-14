import { useEffect, useState } from "react";
import styles from "../Properties.module.css";

export interface Pair<type> {
    first: type;
    second: type;
}

interface Props {
    caption: string;
    items: Pair<string>;
    onChange: (value: Pair<number>) => void;
    value: Pair<number>;
}

export default function DoubleInput({ caption, items, value, onChange }: Props) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (field: "first" | "second", newValue: number) => {
        const updatedValue = { ...localValue, [field]: newValue };
        setLocalValue(updatedValue);
    };

    const handleBlur = (field: "first" | "second", newValue: number) => {
        const updatedValue = { ...localValue, [field]: newValue };
        setLocalValue(updatedValue);
        onChange(updatedValue);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{caption}</h4>
            <div className={styles.doubleContainer}>
                <div>
                    <label className={styles.labelText}>{items.first}</label>
                    <input
                        className={styles.inputField}
                        type="number"
                        value={localValue.first}
                        onChange={(e) => handleChange("first", Number(e.target.value))}
                        onBlur={(e) => handleBlur("first", Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className={styles.labelText}>{items.second}</label>
                    <input
                        className={styles.inputField}
                        type="number"
                        value={localValue.second}
                        onChange={(e) => handleChange("second", Number(e.target.value))}
                        onBlur={(e) => handleBlur("second", Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}
