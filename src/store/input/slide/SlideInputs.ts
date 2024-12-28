import { Position, TextElement, ImageElement } from "~/store/types/Presentation";

export type RemoveElementInput = {
    slideId: string;
    elementId: string;
};

export type ChangeRelativeInput = {
    slideId: string;
    newRelative: Position;
};

export type ChangeScaleInput = {
    slideId: string;
    newScale: number;
};

export type UpdateSlideBackgroundInput = {
    slideId: string;
    newBackground: string;
};

export type StoreElementInput = {
    slideId: string;
    element: TextElement | ImageElement;
};
