import { useEffect } from "react";
import { ToolType } from "~/store/types/Global";
import { useAppActions } from "../useAppActions";
import { Editor } from "~/store/types/Editor";
import { MouseEventsHandler } from "./handler/MouseEventsHandler";
import { EditorService } from "./service/EditorService";

interface UseMouseEventsProps {
    tool: ToolType;
    workspaceRef: React.RefObject<HTMLDivElement>;
    editorRef: React.RefObject<Editor>;
}

export function useMouseEvents({ tool, workspaceRef, editorRef }: UseMouseEventsProps) {
    const actions = useAppActions();

    const errorhandler = (callback: () => void) => {
        try {
            callback();
        } catch (error) {
            console.log(error);
        }
    }

    const hookBody = () => {
        const element = workspaceRef.current;
        if (!element) return;
        const editorService = new EditorService({
            actions: actions,
        });

        const handler = new MouseEventsHandler({
            presentationService: editorService,
            editor: editorRef,
            canvas: element.getBoundingClientRect(),
            tool: tool
        });

        const handleMouseDown = (event: MouseEvent) => {
            errorhandler(() => {handler.handleMouseDown(event)});
        };

        const handleMouseUp = (event: MouseEvent) => {
            errorhandler(() => {handler.handleMouseUp(event)});
        };

        const handleMouseMove = (event: MouseEvent) => {
            errorhandler(() => {handler.handleMouseMove(event)});
        };

        const handleMouseWheel = (event: WheelEvent) => {
            errorhandler(() => {handler.handleMouseWheel(event)});
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
    }

    useEffect(() => hookBody(), [tool]);
}