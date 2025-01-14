import { Rect } from "../../types/Global";

export type UpdateElementsRectInput = {
    rectMap: ElementRects;
};

export type UpdateElementZIndexInput = {
    elementId: string;
    newZIndex: number;
}

export type ElementRects = Record<string, Rect>;