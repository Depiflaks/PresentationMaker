import styles from "./SlideSeparator.module.css"
import move from "~/views/assets/slideList/separator/move.svg"

type Props = {
    slideId: string;
    onSeparatorClick: () => void;
    onDragEnter: () => void;
    isSelected: boolean;
    isEntered: boolean;
};

export default function SlideSeparator({slideId, onSeparatorClick, isSelected, onDragEnter, isEntered}: Props) {

    return (
        <div className={styles.container}
            onClick={onSeparatorClick}
            onDragEnter={(event) => {
                event.preventDefault()
                onDragEnter()
            }}
            onDragOver={(event) => {event.preventDefault()}}
        >
            <div
                className={`${styles.separator} ${isSelected && styles.selected} ${isEntered && styles.entered}`}
            >
                {isEntered && (
                    <img src={move} alt="Move Icon" />
                )}
            </div>
        </div>
    );
}