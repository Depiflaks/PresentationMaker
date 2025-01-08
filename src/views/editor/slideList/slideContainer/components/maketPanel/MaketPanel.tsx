import { CSSProperties, useEffect, useState } from "react";
import styles from "./MaketPanel.module.css";
import SlideThumbnail from "./slideThumbnail/SlideThumbnail";
import { slidesModels } from "~/store/data/models/Models";

type Props = {
    onSelect: (maketId: number) => void;
    style: CSSProperties;
    isVisible: boolean;
    onClose: () => void;
    panelRef: React.RefObject<HTMLDivElement>;
};

export default function MaketPanel({ onSelect, style, isVisible, onClose, panelRef }: Props) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

    const handleAnimationEnd = () => {
        if (!isVisible) setIsAnimating(false);
    };
    const makets = slidesModels;

    return (
        <div
            ref={panelRef}
            className={`${styles.panel} ${isAnimating ? styles.show : styles.hide}`}
            style={style}
            onAnimationEnd={handleAnimationEnd}
        >
            {makets.map((maket, index) => (
                <SlideThumbnail key={index} elements={maket} onClick={() => onSelect(index)} />
            ))}
        </div>
    );
}
