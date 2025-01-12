import styles from "./ToolBar.module.css";
import { ToolType } from "~/store/types/Global";
import Tool from "./tool/Tool";
import { useKeyboardShortcut } from "~/views/hooks/workspace/useKeyboardShortcut";
import { TOOLBAR_ACTIONS, TOOLBAR_TOOLS } from "./const/tools";
import React from "react";
import { HistoryContext } from "~/views/hooks/historyContext";
import { useAppActions } from "~/views/hooks/useAppActions";

type Props = {
    currentTool: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

export default function ToolBar({ currentTool, onToolChange }: Props) {
    useKeyboardShortcut(onToolChange);
    const { setEditor } = useAppActions();
    const history = React.useContext(HistoryContext);

    function onUndo() {
        const newEditor = history.undo();
        if (newEditor) {
            setEditor(newEditor);
        }
    }

    function onRedo() {
        const newEditor = history.redo();
        if (newEditor) {
            setEditor(newEditor);
        }
    }
    return (
        <div className={styles.toolbar}>
            <Tool
                onToolChange={onUndo}
                currentTool={currentTool}
                type={ToolType.UNDO}
            />
            <Tool
                onToolChange={onRedo}
                currentTool={currentTool}
                type={ToolType.REDO}
            />
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
