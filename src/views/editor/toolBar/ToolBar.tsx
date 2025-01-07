import "./ToolBar.css";
import { ToolType } from "~/store/types/Presentation";
import { useState } from "react";
import Tool from "./tool/Tool";
import { toolBarIconsMap } from "~/store/icons/toolBar/toolBarIcons";
import ToolPopup from "./popup/ToolPopup";
import { useKeyboardShortcut } from "~/views/hooks/useKeyboardShortcut";

type Props = {
    current: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

export default function ToolBar({ current, onToolChange }: Props) {
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    useKeyboardShortcut(onToolChange);

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
                                change={isSettings ? handleSettingsClick : onToolChange}
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
                                        onToolChange(newTool);
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
        </div>
    );
}
