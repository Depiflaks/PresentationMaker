import { ActionService } from "../service/ActionService";
import { CursorDelta, MouseState } from "./type/types";
import { Position, ToolType } from "~/store/types/Global";
import { EditorService } from "../service/EditorService";
import { CanvasService } from "../service/CanvasService";
import { emptyState } from "./const/CONST";
import { MouseAction } from "./type/MouseAction";
import { InputService } from "../service/InputService";
import { AreaType } from "~/store/types/slide/Slide";

type MouseEventsHandlerInput = {
    service: Service;
    tool: ToolType;
};

type Service = {
    action: ActionService;
    input: InputService;
};

type SelectionState = {
    state: MouseState;
    type: MouseAction;
    tool: ToolType;
    delta: CursorDelta;
};

export class MouseEventsHandler {
    private service: Service;

    private selection: SelectionState;

    constructor({ service, tool }: MouseEventsHandlerInput) {
        this.service = service;
        this.selection = {
            state: { ...emptyState },
            type: MouseAction.SELECT,
            tool: tool,
            delta: {},
        };
    }

    handleMouseDown(event: MouseEvent): void {
        const mouse = CanvasService.getRelative(event)
        this.selection.state.start = mouse;
        this.selection.state.current = mouse;
        this.selection.state.isPressed = true;
        switch (this.selection.tool) {
            case ToolType.ZOOM:
                this.handleZoomDown(event);
                break;
            case ToolType.SELECTION:
                this.handleSelectionDown();
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                this.selection.type = MouseAction.SELECT;
                break;
        }
    }

    private handleZoomDown(event: MouseEvent): void {
        let deltaScale = 5;
        this.service.action.zoom({
            deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
            mouse: this.selection.state.start,
        });
    }

    private handleSelectionDown() {
        const mouse = this.selection.state.start;
        const itemId = this.getForegroundObjectId();
        if (EditorService.checkCurrentSelectionIntersection(mouse)) {
            this.selection.delta = EditorService.calculateCursorDelta(mouse);
            this.setSelectionAreaType(AreaType.TRANSPARENT_FILL);
            this.selection.type = MouseAction.MOVE;
            return;
        } else if (itemId) {
            this.setSelectionAreaType(AreaType.NONE_FILL);
            this.setSelectedList([itemId]);
            this.selection.delta = EditorService.calculateCursorDelta(mouse);
            this.selection.type = MouseAction.MOVE;
        } else {
            this.setSelectionAreaType(AreaType.TRANSPARENT_FILL);
            this.setSelectedList([]);
            this.selection.type = MouseAction.SELECT;
        }
    }

    private setSelectedList(itemIdList: string[]): void {
        this.service.action.setSelectedList(itemIdList);
    }

    private setSelectionAreaByMouseState(): void {
        this.service.action.setSelectionArea(
            ActionService.calculateSelectionRect(this.selection.state),
        );
    }

    private setSelectionAreaBySelectedItems(): void {
        const slide = EditorService.getSlide();
        this.service.action.setSelectionArea(
            EditorService.rectSelectedItems(
                slide.view.elements,
                slide.selection.elements,
            ),
        );
    }

    private setSelectionAreaType(newType: AreaType): void {
        this.service.action.setSelectionAreaType(newType);
    }

    private getForegroundObjectId(): string | null {
        return EditorService.getForegroundObjectId(this.selection.state.start);
    }

    handleMouseMove(event: MouseEvent): void {
        if (!this.selection.state.isPressed) return;
        this.selection.state.current = CanvasService.getRelative(event);
        switch (this.selection.tool) {
            case ToolType.HAND:
                this.moveCanvas();
                break;
            case ToolType.SELECTION:
                this.handleSelectionMove();
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                if (this.selection.type === MouseAction.SELECT) {
                    this.setSelectionAreaByMouseState();
                }
                break;
        }
    }

    private handleSelectionMove(): void {
        switch (this.selection.type) {
            case MouseAction.SELECT:
                this.setSelectionAreaByMouseState();
                break;
            case MouseAction.MOVE:
                this.moveSelection();
                break;
        }
    }

    private moveCanvas(): void {
        this.service.action.moveCanvas({
            x: this.selection.state.current.x - this.selection.state.start.x,
            y: this.selection.state.current.y - this.selection.state.start.y,
        });
    }

    private moveSelection(): void {
        const slide = EditorService.getSlide();
        const selectionRect = EditorService.rectSelectedItems(
            slide.view.elements,
            slide.selection.elements,
        );
        const delta: Position = {
            x: selectionRect.x - this.selection.state.start.x,
            y: selectionRect.y - this.selection.state.start.y
        }
        this.service.action.setSelectionArea(
            {
                ...slide.selection.area,
                x: this.selection.state.current.x + delta.x,
                y: this.selection.state.current.y + delta.y
            }
        );
    }

    private moveItems(): void {
        this.service.action.moveItems({
            cursorDelta: this.selection.delta,
            mouseState: this.selection.state,
        });
    }

    handleMouseUp(event: MouseEvent): void {
        this.selection.state.isPressed = false;
        this.selection.state.end = CanvasService.getRelative(event);

        switch (this.selection.tool) {
            case ToolType.SELECTION:
                this.handleSelectionUp();
                break;
            case ToolType.IMAGE:
                this.handleImageUp();
                break;
            case ToolType.TEXT:
                this.handleTextUp();
                break;
        }
    }

    private handleSelectionUp(): void {
        if (this.selection.type === MouseAction.SELECT) {
            this.setSelectionAreaType(AreaType.NONE_FILL);
            const newSelection = EditorService.listIntersectedElements();
            this.setSelectedList(newSelection);
        } else if (this.selection.type === MouseAction.MOVE) {
            this.setSelectionAreaType(AreaType.NONE_FILL);
            this.setSelectionAreaBySelectedItems();
            this.moveItems();
        }
    }

    private handleImageUp(): void {
        if (this.selection.type === MouseAction.SELECT) {
            const element = this.service.action.createImageElement(
                this.selection.state,
            );
            const callback = (value: string) => {
                element.href = value;
                this.service.action.storeElement(element);
            };
            this.service.input.initInput(callback);
        }
        this.clearSelection();
    }

    private handleTextUp(): void {
        if (this.selection.type === MouseAction.SELECT) {
            const element = this.service.action.createTextElement(
                this.selection.state,
            );
            element.fontSize = element.height;
            this.service.action.storeElement(element);
        }
        this.clearSelection();
    }

    handleMouseWheel(event: WheelEvent): void {
        const mouse = CanvasService.getRelative(event);
        const deltaScale = event.deltaY > 0 ? 1 : -1;

        this.service.action.zoom({
            deltaScale,
            mouse: mouse,
        });
    }

    private clearSelection(): void {
        this.selection.state = {
            ...emptyState,
            isPressed: this.selection.state.isPressed,
        };
        this.service.action.setSelectionArea(
            ActionService.calculateSelectionRect(this.selection.state),
        );
        this.service.action.setSelectedList([]);
    }
}
