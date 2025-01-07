import "./ToolBar.css";
import { ToolType } from "~/store/types/Presentation";
import { useEffect, useState } from "react";
import Tool from "./tool/Tool";
import { toolBarIconsMap } from "~/store/icons/toolBar/toolBarIcons";
import ToolPopup from "./popup/ToolPopup";

type Props = {
    current: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

export default function ToolBar({ current, onToolChange: change }: Props) {
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

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

    const handleSettingsClick = () => {
        setPopupOpen((prev) => !prev);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div className="toolbar">
            {Object.entries(toolBarIconsMap)
                .filter(([type]) => type !== ToolType.NONE)
                .map(([type, imgSrc], i) => {
                    const isSettings = type === ToolType.SETTINGS;
                    return (
                        <div key={i} style={{ position: "relative" }}>
                            <Tool
                                change={isSettings ? handleSettingsClick : change}
                                current={current}
                                type={type as ToolType}
                                imgSrc={imgSrc}
                            />
                            {isSettings && isPopupOpen && (
                                <ToolPopup
                                    tools={Object.entries(toolBarIconsMap)
                                        .filter(([v]) => v !== ToolType.SETTINGS && v !== ToolType.NONE)
                                        .map(([v, src]) => ({
                                            value: v as ToolType,
                                            imgSrc: src,
                                        }))}
                                    onClose={closePopup}
                                    onToolChange={(newTool) => {
                                        closePopup();
                                        change(newTool);
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
        </div>
    );
}
