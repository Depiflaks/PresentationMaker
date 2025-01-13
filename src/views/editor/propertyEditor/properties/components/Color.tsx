import styles from "../Properties.module.css";

interface ColorProps {
    caption: string;
    onChange: (value: string) => void;
    color: string;
}

export default function Color({ caption, color, onChange }: ColorProps) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            onChange(value);
        }
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.header}>{caption}</h4>
            <div className={styles.colorContainer}>
                <input
                    className={styles.colorInput}
                    type="color"
                    defaultValue={color}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                />
                <input
                    className={styles.inputField}
                    type="text"
                    defaultValue={color}
                    onBlur={handleTextChange}
                />
            </div>
        </div>
    );
}
