import { useEffect } from "react";
import { ToolType } from "~/store/types/Global";
import { useAppActions } from "../useAppActions";
import { ActionService } from "./service/ActionService";

type Props = {
    onToolChange: (newTool: ToolType) => void;
    onUndo: () => void;
    onRedo: () => void;
}

export function useKeyboard({ onToolChange, onRedo, onUndo }: Props) {
    const actions = useAppActions();
    useEffect(() => {
        const actionService = new ActionService({actions});
        const handleKeyDown = (event: KeyboardEvent): void => {
            switch (event.key) {
                case " ":
                    onToolChange(ToolType.HAND);
                    break;
                case "v":
                    onToolChange(ToolType.SELECTION);
                    break;
                case "t":
                    onToolChange(ToolType.TEXT);
                    break;
                case "i":
                    onToolChange(ToolType.IMAGE);
                    break;
                case "z":
                    if (event.ctrlKey || event.metaKey) {
                        onUndo()
                    } else {
                        onToolChange(ToolType.ZOOM);
                    }
                    break;
                case "u":
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault()
                        onRedo()
                    }
                    break
                case "Delete":
                    actionService.deleteSelectedItems();
                    break
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onToolChange]);
}