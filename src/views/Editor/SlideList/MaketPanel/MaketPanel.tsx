import { CSSProperties, useEffect, useRef, useState } from "react";
import "./MaketPanel.css";
import SlideThumbnail from "./SlideThumbnail/SlideThumbnail";
import { slidesModels } from "~/store/Data/Models/Models";

type Props = {
    onSelect: (maketId: number) => void;
    style: CSSProperties;
    isVisible: boolean;
    onClose: () => void;
};

export default function MaketPanel({ onSelect, style, isVisible, onClose }: Props) {
    const [isAnimating, setIsAnimating] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

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
            className={`maket-panel ${isAnimating ? "show" : "hide"}`}
            style={style}
            onAnimationEnd={handleAnimationEnd}
        >
            {makets.map((maket, index) => (
                <SlideThumbnail key={index} elements={maket} onClick={() => onSelect(index)} />
            ))}
        </div>
    );
}
