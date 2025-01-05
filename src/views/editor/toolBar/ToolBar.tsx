import hand from "~/views/assets/toolBar/hand.svg";
import image from "~/views/assets/toolBar/image.svg";
import cursor from "~/views/assets/toolBar/cursor.svg";
import text from "~/views/assets/toolBar/text.svg";
import zoom from "~/views/assets/toolBar/zoom.svg";
import settings from "~/views/assets/toolBar/settings/settings.svg";

import "./ToolBar.css";
import { ToolType } from "~/store/types/Presentation";
import { useEffect } from "react";
import Tool from "./tool/Tool";

type Props = {
    current: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

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
