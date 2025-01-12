import { ActionService } from "../service/ActionService";
import { CursorDelta, MouseState } from "./type/types";
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
        this.selection.state.start = CanvasService.getRelative(event);
        this.selection.state.isPressed = true;
        switch (this.selection.tool) {
            case ToolType.ZOOM:
                this.zoomToolAction(event);
                break;
            case ToolType.SELECTION:
                this.handleSelectionClick();
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                this.selection.type = MouseAction.SELECT;
                break;
        }
    }

    private handleSelectionClick() {
        const mouse = this.selection.state.start;
        const itemId = this.getForegroundObjectId();
        if (EditorService.checkCurrentSelectionIntersection(mouse)) {
            this.selection.delta = EditorService.calculateCursorDelta(mouse);
            this.selection.type = MouseAction.MOVE;
            return;
        } else if (itemId) {
            this.setSelectedList([itemId]);
            this.selection.delta = EditorService.calculateCursorDelta(mouse);
            this.selection.type = MouseAction.MOVE;
        } else {
            this.setSelectedList([]);
            this.selection.type = MouseAction.SELECT;
        }
    }

    private zoomToolAction(event: MouseEvent): void {
        let deltaScale = 5;
        this.service.action.zoom({
            deltaScale: deltaScale * (event.buttons === 1 ? -1 : 1),
            mouse: this.selection.state.start,
        });
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
                if (this.selection.type === MouseAction.SELECT) {
                    this.setSelectionAreaByMouseState();
                    break;
                }
                if (this.selection.type === MouseAction.MOVE) {
                    this.moveItems();
                    this.setSelectionAreaBySelectedItems();
                    break;
                }
                break;
            case ToolType.TEXT:
            case ToolType.IMAGE:
                if (this.selection.type === MouseAction.SELECT) {
                    this.setSelectionAreaByMouseState();
                }
                break;
        }
    }

    private moveCanvas(): void {
        this.service.action.moveCanvas({
            x: this.selection.state.current.x - this.selection.state.start.x,
            y: this.selection.state.current.y - this.selection.state.start.y,
        });
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
                if (this.selection.type === MouseAction.SELECT) {
                    this.clearSelection();
                }
                break;
            case ToolType.IMAGE:
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
                break;
            case ToolType.TEXT:
                if (this.selection.type === MouseAction.SELECT) {
                    const element = this.service.action.createTextElement(
                        this.selection.state,
                    );
                    element.fontSize = element.height;
                    this.service.action.storeElement(element);
                }
                this.clearSelection();
                break;
        }
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
