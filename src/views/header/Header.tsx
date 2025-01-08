import { headerIconsMap } from "~/store/icons/header/headerIcons";
import styles from "./Header.module.css";
import { useRef } from "react";

type Props = {
    title: string
    onTitleChange: (newTitle: string) => void
}

export default function Header({title, onTitleChange}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <header className={styles.header}>
            <div className={`${styles.child} ${styles.left}`}>
                <img src={headerIconsMap.logo} alt="Logo" className={styles.logo} />
                <input
                    ref={inputRef}
                    type="text"
                    defaultValue={title}
                    onChange={() => {onTitleChange(inputRef.current?.value ?? "");}}
                />
            </div>
            <div className={styles.center}> 
                <h1>
                    BANANA <span>MAKER</span>
                </h1>
            </div>
            <div className={`${styles.child} ${styles.right}`}>
                <button title="Import">
                    <img src={headerIconsMap.import} alt="Import" />
                </button>
                <button title="Export">
                    <img src={headerIconsMap.export} alt="Export" />
                </button>
            </div>
        </header>
    );
}
