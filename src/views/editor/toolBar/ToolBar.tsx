import hand from "~/views/assets/ToolBar/hand.svg";
import image from "~/views/assets/ToolBar/image.svg";
import cursor from "~/views/assets/ToolBar/cursor.svg";
import text from "~/views/assets/ToolBar/text.svg";
import zoom from "~/views/assets/ToolBar/zoom.svg";

import "./ToolBar.css";
import { ToolType } from "~/store/types/Presentation";
import { useEffect } from "react";
import Tool from "./tool/Tool";

type Props = {
    current: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

type toolInput = {
    value: ToolType,
    imgSrc: string
}

export default function ToolBar({ current, onToolChange: change }: Props) {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch (event.key) {
                case " ":
                    change(ToolType.HAND);
                    break;
                case "v":
                    change(ToolType.SELECTION);
                    break;
                case "t":
                    change(ToolType.TEXT);
                    break;
                case "i":
                    change(ToolType.IMAGE);
                    break;
                case "z":
                    change(ToolType.ZOOM);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [change]);

    const barValues: toolInput[] = [
        {
            value: ToolType.HAND,
            imgSrc: hand,
        },
        {
            value: ToolType.SELECTION,
            imgSrc: cursor,
        },
        {
            value: ToolType.ZOOM,
            imgSrc: zoom,
        },
        {
            value: ToolType.TEXT,
            imgSrc: text,
        },
        {
            value: ToolType.IMAGE,
            imgSrc: image,
        },
    ];
    // todo: переделать img на наормальные ссылки
    return (
        <div className="toolbar">
            {barValues.map((element, i) => {
                return (
                    <Tool
                        key={i}
                        change={change}
                        current={current}
                        value={element.value}
                        imgSrc={element.imgSrc}
                    />
                );
            })}
        </div>
    );
}
