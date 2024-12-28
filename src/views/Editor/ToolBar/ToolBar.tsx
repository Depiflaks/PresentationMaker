import hand from "~/views/assets/ToolBar/hand.svg";
import image from "~/views/assets/ToolBar/image.svg";
import cursor from "~/views/assets/ToolBar/cursor.svg";
import text from "~/views/assets/ToolBar/text.svg";
import zoom from "~/views/assets/ToolBar/zoom.svg";

import "./ToolBar.css";
import { SelectedTool } from "~/store/types/Presentation";
import { useEffect } from "react";
import Tool from "./tool/Tool";

type Props = {
    current: SelectedTool;
    change: (newTool: SelectedTool) => void;
};

type toolInput = {
    value: SelectedTool,
    imgSrc: string
}

export default function ToolBar({ current, change }: Props) {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch (event.key) {
                case " ":
                    change("hand");
                    break;
                case "v":
                    change("selection");
                    break;
                case "t":
                    change("text");
                    break;
                case "i":
                    change("image");
                    break;
                case "z":
                    change("zoom");
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
            value: "hand",
            imgSrc: hand,
        },
        {
            value: "selection",
            imgSrc: cursor,
        },
        {
            value: "zoom",
            imgSrc: zoom,
        },
        {
            value: "text",
            imgSrc: text,
        },
        {
            value: "image",
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
