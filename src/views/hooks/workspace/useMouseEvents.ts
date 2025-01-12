import { useEffect } from "react";
import { ToolType } from "~/store/types/Global";
import { useAppActions } from "../useAppActions";
import { MouseEventsHandler } from "./handler/MouseEventsHandler";
import { ActionService } from "./service/ActionService";
import { InputService } from "./service/InputService";

interface UseMouseEventsProps {
    tool: ToolType;
    workspaceRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
}

export function useMouseEvents({ tool, workspaceRef, inputRef }: UseMouseEventsProps): void {
    const actions = useAppActions();

    const errorhandler = (callback: () => void) => {
        try {
            callback();
        } catch (error) {
            //console.log(error);
        }
    }

    const hookBody = () => {
        const element = workspaceRef.current;
        if (!element) return;

        const inputService = new InputService(inputRef);

        const actionService = new ActionService({
            actions: actions,
        });

        const handler = new MouseEventsHandler({
            service: {
                action: actionService,
                input: inputService
            },
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