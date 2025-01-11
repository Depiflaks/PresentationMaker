import { ActionService } from "../service/ActionService";
import { MouseState } from "./type/MouseState";
import { ToolType } from "~/store/types/Global";
import { EditorService } from "../service/EditorService";
import { CanvasService } from "../service/CanvasService";
import { emptyState } from "./const/CONST";
import { MouseAction } from "./type/MouseAction";
import { InputService } from "../service/InputService";

type MouseEventsHandlerInput = {
    service: Service;
    tool: ToolType;
};

type Service = {
    canvas: CanvasService;
    action: ActionService;
    editor: EditorService;
    input: InputService;
}

export class MouseEventsHandler {
    private service: Service;

    private mouseState: MouseState;
    private actionType: MouseAction;
    private currentTool: ToolType;

    constructor({
        service,
        tool,
    }: MouseEventsHandlerInput) {
        this.service = service;

        this.mouseState = {...emptyState};
        this.actionType = MouseAction.SELECT;
        this.currentTool = tool;
    }

    handleMouseDown(event: MouseEvent): void {
        const slide = this.service.editor.getSlide();
        this.mouseState.isPressed = true;
        this.mouseState.start = this.service.canvas.getRelative(slide, event);

        switch (this.currentTool) {
            case ToolType.ZOOM:
                let deltaScale = 5;
                this.service.action.zoom({
                    deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
                    mouse: this.mouseState.start,
                    slide: slide,
                });
                break;
            case ToolType.SELECTION:
                // if (EditorService.checkCurrentSelectionIntersection(this.mouseState.start, slide)) {
                //     this.actionType = MouseAction.MOVE;
                //     break;
                // }
                const itemId = this.service.editor.getForegroundObjectId(this.mouseState.start);
                if (!itemId) {
                    this.service.action.setSelectedList(slide.id, []);
                    this.actionType = MouseAction.SELECT;
                } else {
                    this.service.action.setSelectedList(slide.id, [itemId]);
                    this.actionType = MouseAction.MOVE;
                }
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                this.actionType = MouseAction.SELECT;
                break;
        }
    }

    handleMouseMove(event: MouseEvent): void {
        const slide = this.service.editor.getSlide();
        if (!this.mouseState.isPressed) return;
        this.mouseState.current = this.service.canvas.getRelative(slide, event);
        switch (this.currentTool) {
            case ToolType.HAND:
                this.service.action.moveCanvas(slide, {
                    x: this.mouseState.current.x - this.mouseState.start.x,
                    y: this.mouseState.current.y - this.mouseState.start.y,
                });
                break;
            case ToolType.SELECTION:
                if (this.actionType === MouseAction.SELECT) {
                    this.service.action.setMainSelection(slide.id, this.mouseState);
                    break;
                }
                if (this.actionType === MouseAction.MOVE) {
                    break;
                }
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                if (this.actionType === MouseAction.SELECT) {
                    this.service.action.setMainSelection(slide.id, this.mouseState);
                }
                break;
        }
    }

    handleMouseUp(event: MouseEvent): void {
        this.mouseState.isPressed = false;
        const slide = this.service.editor.getSlide();
        this.mouseState.end = this.service.canvas.getRelative(slide, event);

        switch (this.currentTool) {
            case ToolType.SELECTION:
                if (this.actionType === MouseAction.SELECT) {
                    this.clearSelection();
                }
                break;
            case ToolType.IMAGE:
                if (this.actionType === MouseAction.SELECT) {
                    const element = this.service.action.createImageElement(this.mouseState)
                    const callback = (value: string) => {
                        element.href = value;
                        this.service.action.storeElement(slide.id, element);
                    }
                    this.service.input.initInput(callback);
                }
                this.clearSelection();
                break;
            case ToolType.TEXT:
                if (this.actionType === MouseAction.SELECT) {
                    const element = this.service.action.createTextElement(this.mouseState);
                    element.fontSize = element.height;
                    this.service.action.storeElement(slide.id, element);
                }
                this.clearSelection();
                break;
        }
    }

    handleMouseWheel(event: WheelEvent): void {
        const slide = this.service.editor.getSlide();
        const mouse = this.service.canvas.getRelative(slide, event);
        const deltaScale = event.deltaY > 0 ? 1 : -1;

        this.service.action.zoom({
            deltaScale,
            mouse: mouse,
            slide,
        });
    }

    private clearSelection(): void {
        this.mouseState = {...emptyState, isPressed: this.mouseState.isPressed};
        const slide = this.service.editor.getSlide();
        this.service.action.setMainSelection(slide.id, this.mouseState);
        this.service.action.setSelectedList(slide.id, []);
    }
}
