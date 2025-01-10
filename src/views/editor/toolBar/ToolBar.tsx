import styles from "./ToolBar.module.css";
import { ToolType } from "~/store/types/Global";
import Tool from "./tool/Tool";
import { useKeyboardShortcut } from "~/views/hooks/workspace/useKeyboardShortcut";
import { TOOLBAR_TOOLS } from "./const/tools";

type Props = {
    currentTool: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

export default function ToolBar({ currentTool, onToolChange }: Props) {
    useKeyboardShortcut(onToolChange);
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
        </div>
    );
}
