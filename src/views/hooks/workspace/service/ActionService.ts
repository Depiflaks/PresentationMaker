import { DELTA_SCALE } from "~/store/const/CONST";
import { Position, Rect } from "~/store/types/Global";
import { MouseState, MoveItemsInput } from "../handler/type/types";
import { AppendToSelectedListInput, SetSelectionAreaInput, SetSelectedListInput, StoreElementInput, SetSelectionAreaTypeInput } from "~/store/input/slide/SlideInputs";
import { CreateImageElementInput } from "~/store/input/element/image/ImageElementInputs";
import { Element, ImageElement, TextElement } from "~/store/types/slide/element/Element";
import { createImageElement } from "~/store/actions/element/image/Image";
import { CreateTextElementInput } from "~/store/input/element/text/TextElementInputs";
import { createTextElement } from "~/store/actions/element/text/Text";
import { ElementRects, UpdateElementsRectInput } from "~/store/input/element/ElementInputs";
import { EditorService } from "./EditorService";
import { useAppActions } from "../../useAppActions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "~/store/redux/actionCreators/actionCreators";
import { AreaType } from "~/store/types/slide/Slide";

type ZoomOperationInput = {
    mouse: Position;
    deltaScale: number;
}

type EditorServiceInput = {
    actions: ReturnType<typeof useAppActions>;
};

export class ActionService {
    private actions: ReturnType<typeof useAppActions>;

    constructor({actions}: EditorServiceInput) {
        this.actions = actions;
    }

    static getActions(): ReturnType<typeof useAppActions> {
        const dispatch = useDispatch();
        return bindActionCreators(actionCreators, dispatch);
    }

    zoom({mouse, deltaScale}: ZoomOperationInput): void {
        const slide = EditorService.getSlide();
        const { changeScale } = this.actions;

        const newScale = Math.max(
            slide.view.scale + DELTA_SCALE * deltaScale,
            0.1,
        );
        const newCursor: Position = {
            x: mouse.x / slide.view.scale * newScale,
            y: mouse.y / slide.view.scale * newScale
        }
        const newRelative: Position = {
            x: slide.view.relative.x / slide.view.scale * newScale,
            y: slide.view.relative.y / slide.view.scale * newScale,
        }
        const cursorDelta: Position = {
            x: newCursor.x - mouse.x,
            y: newCursor.y - mouse.y
        }
        const relativeDelta: Position = {
            x: newRelative.x - slide.view.relative.x,
            y: newRelative.y - slide.view.relative.y
        }
        changeScale({ slideId: slide.id, newScale: newScale });
        this.moveCanvas({x: cursorDelta.x - relativeDelta.x, y: cursorDelta.y - relativeDelta.y});
    }

    moveCanvas(delta: Position): void {
        const slide = EditorService.getSlide();
        const relative = slide.view.relative;
        const { changeRelative } = this.actions;
        
        changeRelative({
            slideId: slide.id,
            newRelative: {
                x: relative.x - delta.x,
                y: relative.y - delta.y
            }
        });
    }

    moveItems({ mouseState, cursorDelta }: MoveItemsInput): void {
        const slide = EditorService.getSlide();
        const elements = slide.view.elements;
        const { updateElementRect } = this.actions;
        const point = mouseState.current;
        const input: UpdateElementsRectInput = {
            rectMap: {}
        }
        for (const id in cursorDelta) {
            if (Math.abs(elements[id].x - (point.x + cursorDelta[id].x)) < 5 && Math.abs(elements[id].y - (point.y + cursorDelta[id].y)) < 5) continue;
            input.rectMap[id] = {
                ...slide.view.elements[id],
                x: point.x + cursorDelta[id].x,
                y: point.y + cursorDelta[id].y,
            }
        }
        if (Object.keys(input.rectMap).length === 0) return;
        updateElementRect(input);
    }

    resizeItems(newRects: ElementRects): void {
        const { updateElementRect } = this.actions;

        updateElementRect({
            rectMap: newRects
        });
    }

    deleteSelectedItems(): void {
        const slide = EditorService.getSlide();
        const { removeElements } = this.actions;
        const elements = slide.selection.elements;
        if (elements.length !== 0) {
            removeElements({
                slideId: slide.id,
                elementIds: elements
            });
        }
    }

    setSelectionArea(newArea: Rect): void {
        const slide = EditorService.getSlide();
        const { setSelectionArea } = this.actions;
        
        const input: SetSelectionAreaInput = {
            slideId: slide.id,
            newArea: newArea,
        }
        setSelectionArea(input);
    }

    setSelectionAreaType(newType: AreaType): void {
        const slide = EditorService.getSlide();
        const { setSelectionAreaType } = this.actions;
        
        const input: SetSelectionAreaTypeInput = {
            slideId: slide.id,
            areaType: newType,
        }
        setSelectionAreaType(input);
    }

    setSelectedList(itemIdList: string[]): void {
        const { current } = EditorService.getEditor();
        const { setSelectedList } = this.actions;
        const input: SetSelectedListInput = {
            slideId: current,
            newIds: itemIdList
        }
        setSelectedList(input);
    }

    appendSelectedItem(itemId: string): void {
        const { current } = EditorService.getEditor();
        const { appendToSelectedList } = this.actions;
        const input: AppendToSelectedListInput = {
            slideId: current,
            itemId: itemId
        }
        appendToSelectedList(input);
    }

    createImageElement(mouseState: MouseState, href: string = ""): ImageElement {
        const rect = ActionService.calculateRect(mouseState.start, mouseState.end);
        const input: CreateImageElementInput = {
            href: href,
            ...rect
        }
        return createImageElement(input);
    }

    createTextElement(mouseState: MouseState): TextElement {
        const rect = ActionService.calculateRect(mouseState.start, mouseState.end);
        const input: CreateTextElementInput = {
            ...rect
        }
        return createTextElement(input);
    }

    storeElement(element: Element): void {
        const { current } = EditorService.getEditor();
        const { storeElement } = this.actions;
        const input: StoreElementInput = {
            slideId: current,
            element: element
        }
        storeElement(input);
    }

    static calculateSelectionRect(mouseState: MouseState): Rect {
        let start: Position = {...mouseState.start};
        let end: Position = {...mouseState.current};
        if (start.x > end.x) [start.x, end.x] = [end.x, start.x];
        if (start.y > end.y) [start.y, end.y] = [end.y, start.y];
        return ActionService.calculateRect(start, end);
    }

    static calculateRect(start: Position, end: Position): Rect {
        return {
            x: start.x,
            y: start.y,
            width:  end.x - start.x,
            height: end.y - start.y
        }
    }
}
