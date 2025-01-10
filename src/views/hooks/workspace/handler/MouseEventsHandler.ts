import { Editor } from "~/store/types/Editor";
import { PresentationService } from "../service/PresentationService";
import { MouseState } from "./type/MouseState";
import { FIELD } from "~/store/const/CONST";
import { ToolType, Position } from "~/store/types/Global";
import { Slide } from "~/store/types/slide/Slide";

type MouseEventsHandlerInput = {
    editor: React.RefObject<Editor>;
    presentationService: PresentationService;
    tool: ToolType;
    canvas: DOMRect;
};

const emptyState: MouseState = {
    isPressed: false,
    start: {
        x: 0,
        y: 0,
    },
    end: {
        x: 0,
        y: 0,
    },
    current: {
        x: 0,
        y: 0,
    },
};

export class MouseEventsHandler {
    private editor: React.RefObject<Editor>;
    private tool: ToolType;
    private canvas: DOMRect;
    private presentationService: PresentationService;
    private state: MouseState;

    constructor({
        editor,
        presentationService,
        canvas,
        tool,
    }: MouseEventsHandlerInput) {
        this.editor = editor;
        this.canvas = canvas;
        this.tool = tool;
        this.presentationService = presentationService;
        this.state = emptyState;
    }

    handleMouseDown(event: MouseEvent): void {
        this.state.isPressed = true;
        this.state.start = this.getRelative(event);
        const slide = this.getSlide();

        switch (this.tool) {
            case ToolType.ZOOM:
                let deltaScale = 5;
                this.presentationService.zoom({
                    deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
                    mouse: this.state.start,
                    slide: slide
                });
                break;
        }
    }

    handleMouseUp(event: MouseEvent): void {
        this.state.isPressed = false;
        this.state.end = this.getRelative(event);
    }

    handleMouseMove(event: MouseEvent): void {
        const slide = this.getSlide();
        if (!this.state.isPressed) return;
        this.state.current = this.getRelative(event);
        switch (this.tool) {
            case ToolType.HAND:
                this.presentationService.moveCanvas(slide, {
                    x: this.state.current.x - this.state.start.x,
                    y: this.state.current.y - this.state.start.y,
                });
                break;
        }
    }

    handleMouseWheel(event: WheelEvent): void {
        const slide = this.getSlide();
        const mouse = this.getRelative(event);
        const deltaScale = event.deltaY > 0 ? 1 : -1;

        this.presentationService.zoom({
            deltaScale,
            mouse: mouse,
            slide,
        });
    }

    private getRelative(event: MouseEvent): Position {
        const slide = this.getSlide();
        const result: Position = {
            x: 0,
            y: 0,
        };
        const mouse = this.getMousePosition(event);
        const measure = FIELD.width / this.canvas.width;
        const canvasHeight = (this.canvas.width * FIELD.height) / FIELD.width;
        const deltaHeight = (this.canvas.height - canvasHeight) / 2;

        result.x = mouse.x * measure * slide.view.scale + slide.view.relative.x;
        result.y =
            (mouse.y - deltaHeight) * measure * slide.view.scale + slide.view.relative.y;
        return result;
    }

    private getMousePosition(event: MouseEvent | WheelEvent): Position {
        return {
            x: event.clientX - this.canvas.left,
            y: event.clientY - this.canvas.top,
        };
    }

    private getSlide(): Slide {
        if (!this.editor.current) throw new Error("Editor is not initialized.");
        const editor = this.editor.current;
        return editor.slides[editor.current];
    }
}
