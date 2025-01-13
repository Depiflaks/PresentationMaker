import { useEffect } from "react";
import { ToolType } from "~/store/types/Global";

type Props = {
    onToolChange: (newTool: ToolType) => void;
    onUndo: () => void;
    onRedo: () => void;
}

export function useKeyboard({ onToolChange, onRedo, onUndo }: Props) {
    useEffect(() => {
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
                    if (event.ctrlKey) {
                        onUndo()
                    } else {
                        onToolChange(ToolType.ZOOM);
                    }
                    break;
                case 'u':
                    if (event.ctrlKey) {
                        event.preventDefault()
                        onRedo()
                    }
                    break
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onToolChange]);
}