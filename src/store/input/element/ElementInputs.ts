import { Rect } from "../../types/Global";

export type UpdateElementsRectInput = {
    rectMap: ElementRects;
};

export type ElementRects = Record<string, Rect>;