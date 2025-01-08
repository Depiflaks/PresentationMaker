import { useEffect } from "react";
import { ToolType } from "~/store/types/Presentation";
import { useAppActions } from "../useAppActions";
import { Editor } from "~/store/types/Editor";
import { MouseEventsHandler } from "./handler/MouseEventsHandler";

interface UseMouseEventsProps {
    tool: ToolType;
    workspaceRef: React.RefObject<HTMLDivElement>;
    editorRef: React.RefObject<Editor>;
}

export function useMouseEvents({ tool, workspaceRef, editorRef }: UseMouseEventsProps) {
    const actions = useAppActions();

    useEffect(() => {
        const element = workspaceRef.current;
        if (!element) return;

        const handler = new MouseEventsHandler(editorRef, actions);

        const handleMouseDown = (event: MouseEvent) => {
            // console.log("down");
        };

        const handleMouseUp = (event: MouseEvent) => {
            // console.log("up");
        };

        const handleMouseMove = (event: MouseEvent) => {
            // console.log("move");
        };

        const handleMouseWheel = (event: WheelEvent) => {
            handler.handleMouseWheel(event);
        };

        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("mouseup", handleMouseUp);
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("wheel", handleMouseWheel);

        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
            element.removeEventListener("mouseup", handleMouseUp);
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("wheel", handleMouseWheel);
        };
    }, [tool, workspaceRef]);
}