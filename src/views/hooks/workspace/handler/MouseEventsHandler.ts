import { ActionCreatorsMapObject } from "redux";
import { Editor } from "~/store/types/Editor";
import { Position, Slide, ToolType } from "~/store/types/Presentation";
import { PresentationService } from "./service/PresentationService";

type MouseEventsHandlerInput = {
    editor: React.RefObject<Editor>;
    actions: ActionCreatorsMapObject;
    tool: ToolType;
    element: HTMLDivElement;
};

type MouseState = {
    isPressed: boolean;
    start: Position;
    end: Position;
    current: Position;
};

const emptyState: MouseState = {
    isPressed: false,
    start: {
        x: 0,
        y: 0
    },
    end: {
        x: 0,
        y: 0,
    },
    current: {
        x: 0,
        y: 0
    }
}

export class MouseEventsHandler {
    private editor: React.RefObject<Editor>;
    private tool: ToolType;
    private canvas: DOMRect;
    private presentationService: PresentationService;
    private state: MouseState;

    constructor({ editor, actions, element, tool }: MouseEventsHandlerInput) {
        this.editor = editor;
        this.canvas = element.getBoundingClientRect();
        this.tool = tool;
        this.presentationService = new PresentationService({
            actions,
            canvas: this.canvas,
        });
        this.state = emptyState;
    }

    handleMouseDown(event: MouseEvent): void {
        this.state.isPressed = true;
        this.state.start = this.getMousePosition(event);
        switch (this.tool) {
            case ToolType.HAND:
                break;
        }
    }

    handleMouseUp(event: MouseEvent): void {
        this.state.isPressed = false;
        this.state.end = this.getMousePosition(event);

    }

    handleMouseMove(event: MouseEvent): void {
        this.state.current = this.getMousePosition(event);
        switch (this.tool) {
            case ToolType.HAND:
                break;
        }
    }

    handleMouseWheel(event: WheelEvent): void {
        const slide = this.getSlide();
        if (!slide) return;
        const mouse = this.getMousePosition(event);
        const deltaScale = event.deltaY > 0 ? 1 : -1;

        this.presentationService.calculateZoomOperation({
            deltaScale,
            mouse: mouse,
            slide,
        });
    }

    private getMousePosition(event: MouseEvent|WheelEvent): Position {
        return {
            x: event.clientX - this.canvas.left,
            y: event.clientY - this.canvas.top
        }
    }

    private getSlide(): Slide|null {
        if (!this.editor.current) return null;
        const presentation = this.editor.current.presentation;
        return presentation.slides[presentation.current];
    }
}
