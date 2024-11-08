import { CSSProperties } from "react";
import "./MaketPanel.css"
import SlideThumbnail from "./SlideThumbnail/SlideThumbnail";
import { slidesModels } from "~/store/Data/Models/Models";

type Props = {
    onSelect: (maketId: number) => void;
    style: CSSProperties;
};

export default function MaketPanel({ onSelect, style }: Props) {
    const makets = slidesModels;
    return (
        <div className="maket-panel" style={style}>
            {makets.map((maket, index) => (
                <SlideThumbnail key={index} elements={maket} onClick={() => onSelect(index + 1)}/>
            ))}
        </div>
    );
}