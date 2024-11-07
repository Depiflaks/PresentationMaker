import { CSSProperties } from "react";
import "./MaketPanel.css"

type Props = {
    onSelect: (maketId: number) => void;
    style: CSSProperties;
};

export default function MaketPanel({ onSelect, style }: Props) {
    const layouts = 
    return (
        <div className="maket-panel" style={style}>
            {[...Array(9)].map((_, i) => (
                <div
                    key={i}
                    className="maket-option"
                    onClick={() => onSelect(i + 1)}
                >
                    Maket {i + 1}
                </div>
            ))}
        </div>
    );
}