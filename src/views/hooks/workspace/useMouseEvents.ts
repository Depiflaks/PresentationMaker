import { useEffect } from "react";
import { ToolType } from "~/store/types/Global";
import { useAppActions } from "../useAppActions";
import { Editor } from "~/store/types/Editor";
import { MouseEventsHandler } from "./handler/MouseEventsHandler";
import { PresentationService } from "./service/PresentationService";

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
        const presentationService = new PresentationService({
            actions: actions,
        });

        const handler = new MouseEventsHandler({
            presentationService: presentationService,
            editor: editorRef,
            canvas: element.getBoundingClientRect(),
            tool: tool
        });

        const handleMouseDown = (event: MouseEvent) => {
            handler.handleMouseDown(event);
        };

        const handleMouseUp = (event: MouseEvent) => {
            handler.handleMouseUp(event);
        };

        const handleMouseMove = (event: MouseEvent) => {
            handler.handleMouseMove(event);
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
    }, [tool]);
}