import { useEffect } from "react";
import { ToolType } from "~/store/types/Global";

export function useKeyboardShortcut(onToolChange: (newTool: ToolType) => void) {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent): void => {
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
                    onToolChange(ToolType.ZOOM);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [onToolChange]);
}