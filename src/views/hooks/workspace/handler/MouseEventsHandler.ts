import { ActionService } from "../service/ActionService";
import { CursorDelta, MouseState } from "./type/types";
import { ToolType } from "~/store/types/Global";
import { EditorService } from "../service/EditorService";
import { CanvasService } from "../service/CanvasService";
import { emptyState } from "./const/CONST";
import { MouseAction } from "./type/MouseAction";
import { InputService } from "../service/InputService";
import { Slide } from "~/store/types/slide/Slide";

type MouseEventsHandlerInput = {
    service: Service;
    tool: ToolType;
};

type Service = {
    canvas: CanvasService;
    action: ActionService;
    editor: EditorService;
    input: InputService;
};

export class MouseEventsHandler {
    private service: Service;

    private mouseState: MouseState;
    private actionType: MouseAction;
    private currentTool: ToolType;
    private cursorDelta: CursorDelta;

    constructor({ service, tool }: MouseEventsHandlerInput) {
        this.service = service;

        this.mouseState = { ...emptyState };
        this.actionType = MouseAction.SELECT;
        this.currentTool = tool;
        this.cursorDelta = {};
    }

    handleMouseDown(event: MouseEvent): void {
        let slide = this.service.editor.getSlide();
        this.mouseState.start = this.service.canvas.getRelative(slide, event);;
        this.mouseState.isPressed = true;
        switch (this.currentTool) {
            case ToolType.ZOOM:
                this.zoomToolAction(event);
                break;
            case ToolType.SELECTION:
                this.handleSelectionClick();
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                this.actionType = MouseAction.SELECT;
                break;
        }
    }

    private handleSelectionClick() {
        let slide = this.service.editor.getSlide();
        const mouse = this.mouseState.start;
        const itemId = this.getForegroundObjectId();

        if (EditorService.checkCurrentSelectionIntersection(mouse, slide)) {
            this.cursorDelta = EditorService.calculateCursorDelta(slide, mouse);
            this.actionType = MouseAction.MOVE;
            return;
        } else if (itemId) {
            slide = this.setSelectedList([itemId]);
            console.log(1, slide.selection.elements, itemId);
            slide = this.setSelectionAreaBySelectedItems();
            this.cursorDelta = EditorService.calculateCursorDelta(slide, mouse);
            this.actionType = MouseAction.MOVE;
        } else {
            slide = this.setSelectedList([]);
            this.actionType = MouseAction.SELECT;
        }
    }

    private zoomToolAction(event: MouseEvent): Slide {
        const slide = this.service.editor.getSlide();
        let deltaScale = 5;
        this.service.action.zoom({
            deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
            mouse: this.mouseState.start,
            slide: slide,
        });
        return this.service.editor.getSlide();
    }

    private setSelectedList(itemIdList: string[]): Slide {
        const slide = this.service.editor.getSlide();
        this.service.action.setSelectedList(slide.id, itemIdList);
        return this.service.editor.getSlide();
    }

    private setSelectionAreaByMouseState(): Slide {
        const slide = this.service.editor.getSlide();
        this.service.action.setSelectionArea(
            slide.id,
            ActionService.calculateSelectionRect(this.mouseState),
        );
        return this.service.editor.getSlide();
    }

    private setSelectionAreaBySelectedItems(): Slide {
        const slide = this.service.editor.getSlide();
        console.log(2, slide.selection.elements);
        this.service.action.setSelectionArea(
            slide.id,
            EditorService.rectSelectedItems(
                slide.view.elements,
                slide.selection.elements,
            ),
        );
        return this.service.editor.getSlide();
    }

    private getForegroundObjectId(): string | null {
        return this.service.editor.getForegroundObjectId(this.mouseState.start);
    }

    handleMouseMove(event: MouseEvent): void {
        const slide = this.service.editor.getSlide();
        if (!this.mouseState.isPressed) return;
        console.log(4, slide.selection.elements);
        this.mouseState.current = this.service.canvas.getRelative(slide, event);
        switch (this.currentTool) {
            case ToolType.HAND:
                this.moveCanvas();
                break;
            case ToolType.SELECTION:
                if (this.actionType === MouseAction.SELECT) {
                    this.setSelectionAreaByMouseState();
                    break;
                }
                if (this.actionType === MouseAction.MOVE) {
                    this.moveItems();
                    this.setSelectionAreaBySelectedItems();
                    break;
                }
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                if (this.actionType === MouseAction.SELECT) {
                    this.setSelectionAreaByMouseState();
                }
                break;
        }
    }

    private moveCanvas(): Slide {
        const slide = this.service.editor.getSlide();
        this.service.action.moveCanvas(slide, {
            x: this.mouseState.current.x - this.mouseState.start.x,
            y: this.mouseState.current.y - this.mouseState.start.y,
        });
        return this.service.editor.getSlide();
    }

    private moveItems(): Slide {
        const slide = this.service.editor.getSlide();
        this.service.action.moveItems({
            slide,
            cursorDelta: this.cursorDelta,
            mouseState: this.mouseState,
        });
        return this.service.editor.getSlide();
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
                    const element = this.service.action.createImageElement(
                        this.mouseState,
                    );
                    const callback = (value: string) => {
                        element.href = value;
                        this.service.action.storeElement(slide.id, element);
                    };
                    this.service.input.initInput(callback);
                }
                this.clearSelection();
                break;
            case ToolType.TEXT:
                if (this.actionType === MouseAction.SELECT) {
                    const element = this.service.action.createTextElement(
                        this.mouseState,
                    );
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
        this.mouseState = {
            ...emptyState,
            isPressed: this.mouseState.isPressed,
        };
        const slide = this.service.editor.getSlide();
        this.service.action.setSelectionArea(
            slide.id,
            ActionService.calculateSelectionRect(this.mouseState),
        );
        this.service.action.setSelectedList(slide.id, []);
    }
}
