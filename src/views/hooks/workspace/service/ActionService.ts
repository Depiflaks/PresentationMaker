import { ActionCreatorsMapObject } from "redux";
import { DELTA_SCALE } from "~/store/const/CONST";
import { Position, Rect } from "~/store/types/Global";
import { Slide } from "~/store/types/slide/Slide";
import { MouseState } from "../handler/type/MouseState";
import { AppendToSelectedListInput, SetMainSelectionInput, SetSelectedListInput, StoreElementInput } from "~/store/input/slide/SlideInputs";
import { CreateImageElementInput } from "~/store/input/element/image/ImageElementInputs";
import { Element, ImageElement, TextElement } from "~/store/types/slide/element/Element";
import { createImageElement } from "~/store/actions/element/image/Image";
import { CreateTextElementInput } from "~/store/input/element/text/TextElementInputs";
import { createTextElement } from "~/store/actions/element/text/Text";

type ZoomOperationInput = {
    slide: Slide;
    mouse: Position;
    deltaScale: number;
}

type EditorServiceInput = {
    actions: ActionCreatorsMapObject;
};

export class ActionService {
    private actions: ActionCreatorsMapObject;

    constructor({actions}: EditorServiceInput) {
        this.actions = actions;
    }

    zoom({mouse, slide, deltaScale}: ZoomOperationInput): void {
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
        this.moveCanvas(slide, {x: cursorDelta.x - relativeDelta.x, y: cursorDelta.y - relativeDelta.y});
    }

    moveCanvas(slide: Slide, delta: Position): void {
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

    setMainSelection(slideId: string, mouseState: MouseState): void {
        const { setMainSelection } = this.actions;
        let start: Position = {...mouseState.start};
        let end: Position = {...mouseState.current};
        if (start.x > end.x) [start.x, end.x] = [end.x, start.x];
        if (start.y > end.y) [start.y, end.y] = [end.y, start.y];
        const input: SetMainSelectionInput = {
            slideId: slideId,
            newMainSelection: ActionService.calculateRect(start, end)
        }
        setMainSelection(input);
    }

    setSelectedList(slideId: string, itemIdList: string[]): void {
        const { setSelectedList } = this.actions;
        const input: SetSelectedListInput = {
            slideId: slideId,
            newIds: itemIdList
        }
        setSelectedList(input);
    }

    appendSelectedItem(slideId: string, itemId: string): void {
        const { appendToSelectedList } = this.actions;
        const input: AppendToSelectedListInput = {
            slideId: slideId,
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

    storeElement(slideId: string, element: Element): void {
        const { storeElement } = this.actions;
        const input: StoreElementInput = {
            slideId: slideId,
            element: element
        }
        storeElement(input);
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
