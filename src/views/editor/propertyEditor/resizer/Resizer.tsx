import React, { useRef } from "react"
import styles from "../PropertyEditor.module.css"

type Props = {
    onSeparatorChange: (newSize: number) => void
    propertiesRef: React.RefObject<HTMLDivElement>
}

export default function Resizer({onSeparatorChange, propertiesRef}: Props) {
    const resizerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        const newHeight = event.clientY - propertiesRef.current!.getBoundingClientRect().top - resizerRef.current!.getBoundingClientRect().height / 2 - 10;
        onSeparatorChange(newHeight);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className={styles.resizer}
            ref={resizerRef}
            onMouseDown={handleMouseDown}
        />
    )
}