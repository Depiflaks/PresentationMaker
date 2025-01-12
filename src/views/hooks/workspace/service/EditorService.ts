import { Editor } from "~/store/types/Editor";
import { Position, Rect } from "~/store/types/Global";
import { Element } from "~/store/types/slide/element/Element";
import { Elements, Slide } from "~/store/types/slide/Slide";
import { CursorDelta } from "../handler/type/types";
import { store } from "~/store/redux/store";


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

    static mapElementsByZIndex(slide: Slide): Record<number, Elements> {
        const result: Record<number, Elements> = {};

        Object.values(slide.view.elements).forEach((element) => {
            const { zIndex } = element;
            if (!result[zIndex]) {
                result[zIndex] = {};
            }
            result[zIndex][element.id] = element;
        });

        return result;
    }


    static isRectInside(innerRect: Rect, outerRect: Rect): boolean {
        const isLeftInside = innerRect.x >= outerRect.x;
        const isRightInside = innerRect.x + innerRect.width <= outerRect.x + outerRect.width;
        const isTopInside = innerRect.y >= outerRect.y;
        const isBottomInside = innerRect.y + innerRect.height <= outerRect.y + outerRect.height;
    
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

    static checkCurrentSelectionIntersection(point: Position, slide: Slide): boolean {
        for (let id of slide.selection.elements) {
            if (EditorService.isPointIntersect(point, slide.view.elements[id])) {
                return true;
            }
        }
        return false;
    }

    static rectSelectedItems(elements: Elements, selectedIds: string[]): Rect {
        if (selectedIds.length === 0) return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
        let start: Position = {
            x: 10000,
            y: 10000,
        };
        let end: Position = {
            x: 0,
            y: 0,
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

    static calculateCursorDelta(slide: Slide, point: Position): CursorDelta {
        const elements = slide.view.elements;
        const elementIds = slide.selection.elements;
        const result: CursorDelta = {};
        for (let id of elementIds) {
            result[id] = {
                x: elements[id].x - point.x,
                y: elements[id].y - point.y,
            }
        }
        return result
    }

    static getEditor(): Editor {
        return store.getState();
    }

    static getSlide(): Slide {
        const editor = EditorService.getEditor();
        if (editor.current === "") throw new Error("Slide list is empty");
        return editor.slides[editor.current];
    }
}
