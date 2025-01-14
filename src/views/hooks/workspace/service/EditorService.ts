import { Editor } from "~/store/types/Editor";
import { Position, Rect } from "~/store/types/Global";
import { Element } from "~/store/types/slide/element/Element";
import { Elements, Slide } from "~/store/types/slide/Slide";
import { CursorDelta } from "../handler/type/types";
import { store } from "~/store/redux/store";
import { ElementRects } from "~/store/input/element/ElementInputs";

export class EditorService {
    static getForegroundObjectId(point: Position): string | null {
        const slide = EditorService.getSlide();

        const elements = slide.view.elements;
        let topElement: Element | null = null;
        for (const elementId in elements) {
            const element = elements[elementId];
            const intersects = EditorService.isPointIntersect(point, element);
            if (intersects) {
                if (!topElement || element.zIndex > topElement.zIndex) {
                    topElement = element;
                }
            }
        }
        return topElement ? topElement.id : null;
    }

    static mapElementsByZIndex(elements: Element[]): Record<number, Elements> {
        const result: Record<number, Elements> = {};

        elements.forEach((element) => {
            const { zIndex } = element;
            if (!result[zIndex]) {
                result[zIndex] = {};
            }
            result[zIndex][element.id] = element;
        });

        return result;
    }

    static listIntersectedElements(): string[] {
        const slide = EditorService.getSlide();
        const elements = slide.view.elements;
        let result: string[] = [];
        for (const id in elements) {
            if (!EditorService.isRectInside(elements[id], slide.selection.area))
                continue;
            result.push(id);
        }
        return result;
    }

    static isRectInside(innerRect: Rect, outerRect: Rect): boolean {
        const isLeftInside = innerRect.x >= outerRect.x;
        const isRightInside =
            innerRect.x + innerRect.width <= outerRect.x + outerRect.width;
        const isTopInside = innerRect.y >= outerRect.y;
        const isBottomInside =
            innerRect.y + innerRect.height <= outerRect.y + outerRect.height;

        return isLeftInside && isRightInside && isTopInside && isBottomInside;
    }

    static isPointIntersect(point: Position, rect: Rect): boolean {
        const left = rect.x;
        const right = rect.x + rect.width;
        const top = rect.y;
        const bottom = rect.y + rect.height;

        return (
            point.x >= left &&
            point.x <= right &&
            point.y >= top &&
            point.y <= bottom
        );
    }

    static checkCurrentSelectionIntersection(point: Position): boolean {
        const slide = EditorService.getSlide();
        for (let id of slide.selection.elements) {
            if (
                EditorService.isPointIntersect(point, slide.view.elements[id])
            ) {
                return true;
            }
        }
        return false;
    }

    static rectSelectedItems(elements: Elements, selectedIds: string[]): Rect {
        if (selectedIds.length === 0)
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
        let start: Position = {
            x: 10000,
            y: 10000,
        };
        let end: Position = {
            x: -10000,
            y: -10000,
        };
        for (let id of selectedIds) {
            start = {
                x: Math.min(start.x, elements[id].x),
                y: Math.min(start.y, elements[id].y),
            };
            end = {
                x: Math.max(end.x, elements[id].x + elements[id].width),
                y: Math.max(end.y, elements[id].y + elements[id].height),
            };
        }
        return {
            ...start,
            width: end.x - start.x,
            height: end.y - start.y,
        };
    }

    static calculateCursorDelta(point: Position): CursorDelta {
        const slide = EditorService.getSlide();
        const elements = slide.view.elements;
        const elementIds = slide.selection.elements;
        const result: CursorDelta = {};
        for (let id of elementIds) {
            result[id] = {
                x: elements[id].x - point.x,
                y: elements[id].y - point.y,
            };
        }
        return result;
    }
    
    static scaleElements(
        previousArea: Rect, 
        selectedElementIds: string[], 
        newArea: Rect, 
    ): ElementRects {
        const slide = EditorService.getSlide();
        const elements = slide.view.elements
        const scaleX = newArea.width / previousArea.width;
        const scaleY = newArea.height / previousArea.height;
    
        const scaledElements: ElementRects = {};
    
        selectedElementIds.forEach((id) => {
            const element = elements[id];
            if (!element) return;
    
            const newElement: Rect = {
                x: (element.x - previousArea.x) * scaleX + newArea.x,
                y: (element.y - previousArea.y) * scaleY + newArea.y,
                width: element.width * scaleX,
                height: element.height * scaleY,
            };
    
            scaledElements[id] = newElement;
        });
    
        return scaledElements;
    }
    

    static getEditor(): Editor {
        return store.getState();
    }

    static roundRect(rect: Rect): Rect {
        return {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        };
    }

    static getSlide(): Slide {
        const editor = EditorService.getEditor();
        if (editor.current === "") throw new Error("Slide list is empty");
        return editor.slides[editor.current];
    }
}
