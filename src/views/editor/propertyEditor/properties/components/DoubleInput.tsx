import styles from "../Properties.module.css";

interface Pair<type> {
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
    const changeFirst = (newValue: number) => {
        onChange({ ...value, first: newValue });
    };
    const changeSecond = (newValue: number) => {
        onChange({ ...value, second: newValue });
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
                        value={value.first}
                        onChange={(e) => changeFirst(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className={styles.labelText}>{items.second}</label>
                    <input
                        className={styles.inputField}
                        type="number"
                        value={value.second}
                        onChange={(e) => changeSecond(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}
