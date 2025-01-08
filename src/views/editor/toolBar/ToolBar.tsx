import styles from "./ToolBar.module.css";
import { ToolType } from "~/store/types/Presentation";
import { useState } from "react";
import Tool from "./tool/Tool";
import ToolPopup from "./popup/ToolPopup";
import { useKeyboardShortcut } from "~/views/hooks/useKeyboardShortcut";
import { TOOLBAR_TOOLS } from "./const/tools";

type Props = {
    currentTool: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

export default function ToolBar({ currentTool, onToolChange }: Props) {
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    useKeyboardShortcut(onToolChange);

    const handleSettingsClick = () => {
        setPopupOpen((prev) => !prev);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };
    return (
        <div className={styles.toolbar}>
            {TOOLBAR_TOOLS.map((toolType: ToolType, i) => (
                <Tool
                    key={i}
                    onToolChange={onToolChange}
                    currentTool={currentTool}
                    type={toolType}
                />
            ))}
            <div className={styles['settings-menu']}>
                <Tool
                    onToolChange={handleSettingsClick}
                    currentTool={currentTool}
                    type={ToolType.SETTINGS}
                />

                {isPopupOpen && (
                    <ToolPopup
                        onClose={closePopup}
                        onToolChange={(newTool) => {
                            closePopup();
                            onToolChange(newTool);
                        }}
                        isPopupOpen={isPopupOpen}
                    />
                )}
            </div>
            
        </div>
    );
}
