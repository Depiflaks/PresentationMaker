import { RefObject } from "react";
import { endSlide } from "../../const/CONST";
import styles from "./AddButton.module.css";
import add from "~/views/assets/slideList/add.svg"

type Props = {
    buttonRef: RefObject<HTMLDivElement>;
    onDragEnter: (_: string) => void;
    toggleMaketPanel: () => void;
}

export default function AddButton({ buttonRef, onDragEnter, toggleMaketPanel }: Props) {
    return (
        <div
            className={styles.add}
            onDragEnter={(event) => {
                event.preventDefault();
                onDragEnter(endSlide);
            }}
            onDragOver={(event) => {
                event.preventDefault();
            }}
            draggable={false}
            onClick={toggleMaketPanel}
            ref={buttonRef}
        >
            <img src={add} draggable={false} />
        </div>
    );
}
