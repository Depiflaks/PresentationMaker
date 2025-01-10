import { ActionService } from "../service/ActionService";
import { MouseState } from "./type/MouseState";
import { ToolType } from "~/store/types/Global";
import { EditorService } from "../service/EditorService";
import { CanvasService } from "../service/CanvasService";
import { emptyState } from "./const/CONST";
import { MouseAction } from "./type/MouseAction";

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

    private mouseState: MouseState;
    private actionType: MouseAction;
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

        this.mouseState = {...emptyState};
        this.actionType = MouseAction.SELECT;
        this.currentTool = tool;
    }

    handleMouseDown(event: MouseEvent): void {
        const slide = this.editorService.getSlide();
        this.mouseState.isPressed = true;
        this.mouseState.start = this.canvasService.getRelative(slide, event);

        switch (this.currentTool) {
            case ToolType.ZOOM:
                let deltaScale = 5;
                this.actionService.zoom({
                    deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
                    mouse: this.mouseState.start,
                    slide: slide,
                });
                break;
            case ToolType.SELECTION:
                //const itemId = this.editorService.getForegroundObjectId(this.mouseState.start);
                this.actionType = MouseAction.SELECT;
                break;
            case ToolType.TEXT, ToolType.IMAGE:
                this.actionType = MouseAction.SELECT;
                break;
        }
    }

    handleMouseMove(event: MouseEvent): void {
        const slide = this.editorService.getSlide();
        if (!this.mouseState.isPressed) return;
        this.mouseState.current = this.canvasService.getRelative(slide, event);
        switch (this.currentTool) {
            case ToolType.HAND:
                this.actionService.moveCanvas(slide, {
                    x: this.mouseState.current.x - this.mouseState.start.x,
                    y: this.mouseState.current.y - this.mouseState.start.y,
                });
                break;
            case ToolType.SELECTION, ToolType.TEXT, ToolType.IMAGE:
                if (this.actionType === MouseAction.SELECT) {
                    this.actionService.setMainSelection(slide, this.mouseState);
                }
                break;
        }
    }

    handleMouseUp(event: MouseEvent): void {
        this.mouseState.isPressed = false;
        const slide = this.editorService.getSlide();
        this.mouseState.end = this.canvasService.getRelative(slide, event);

        switch (this.currentTool) {
            case ToolType.SELECTION:
                if (this.actionType === MouseAction.SELECT) {
                    this.clearSelection();
                }
                break;
            case ToolType.IMAGE:
                
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

    private clearSelection(): void {
        this.mouseState = {...emptyState};
        const slide = this.editorService.getSlide();
        this.actionService.setMainSelection(slide, this.mouseState);
    }
}
