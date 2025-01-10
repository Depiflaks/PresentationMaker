import { ActionService } from "../service/ActionService";
import { MouseState } from "./type/MouseState";
import { ToolType } from "~/store/types/Global";
import { EditorService } from "../service/EditorService";
import { CanvasService } from "../service/CanvasService";
import { emptyState } from "./const/CONST";

type MouseEventsHandlerInput = {
    actionService: ActionService;
    editorService: EditorService;
    canvasService: CanvasService;
    tool: ToolType;
};

export class MouseEventsHandler {
    private canvasService: CanvasService;
    private actionService: ActionService;
    private editorService: EditorService;
    private state: MouseState;
    private currentTool: ToolType;

    constructor({
        actionService,
        editorService,
        canvasService,
        tool,
    }: MouseEventsHandlerInput) {
        this.canvasService = canvasService;
        this.actionService = actionService;
        this.editorService = editorService;
        this.state = emptyState;
        this.currentTool = tool;
    }

    handleMouseDown(event: MouseEvent): void {
        const slide = this.editorService.getSlide();
        this.state.isPressed = true;
        this.state.start = this.canvasService.getRelative(slide, event);

        switch (this.currentTool) {
            case ToolType.ZOOM:
                let deltaScale = 5;
                this.actionService.zoom({
                    deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
                    mouse: this.state.start,
                    slide: slide
                });
                break;
        }
    }

    handleMouseUp(event: MouseEvent): void {
        this.state.isPressed = false;
        const slide = this.editorService.getSlide();
        this.state.end = this.canvasService.getRelative(slide, event);
    }

    handleMouseMove(event: MouseEvent): void {
        const slide = this.editorService.getSlide();
        if (!this.state.isPressed) return;
        this.state.current = this.canvasService.getRelative(slide, event);
        switch (this.currentTool) {
            case ToolType.HAND:
                this.actionService.moveCanvas(slide, {
                    x: this.state.current.x - this.state.start.x,
                    y: this.state.current.y - this.state.start.y,
                });
                break;
        }
    }

    handleMouseWheel(event: WheelEvent): void {
        const slide = this.editorService.getSlide();
        const mouse = this.canvasService.getRelative(slide, event);
        const deltaScale = event.deltaY > 0 ? 1 : -1;

        this.actionService.zoom({
            deltaScale,
            mouse: mouse,
            slide,
        });
    }
}
