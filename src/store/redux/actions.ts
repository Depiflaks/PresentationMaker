import { StoreElementInput } from "../actions/slide/Slide";
import { ImageElement, Position, Size, Slide, TextElement } from "../types/Presentation";

export enum ActionType {
    UPDATE_PRESENTATION_TITLE = "updatePresentationTitle",
    CHANGE_CURRENT = "changeCurrent",
    STORE_SLIDE = "storeSlide",
    REMOVE_SLIDE = "removeSlide",
    MOVE_SLIDE = "moveSlide",

    REMOVE_ELEMENT = "removeElement",
    CHANGE_RELATIVE = "changeRelative",
    CHANGE_SCALE = "changeScale",
    UPDATE_SLIDE_BACKGROUND = "updateSlideBackground",
    STORE_ELEMENT = "storeElement",

    UPDATE_ELEMENT_POSITION = "updateElementPosition",
    UPDATE_ELEMENT_SIZE = "updateElementSize",

    UPDATE_TEXT_ELEMENT = "updateTextElement",
}

// Presentation

export type UpdatePresentationTitleAction = {
    type: ActionType.UPDATE_PRESENTATION_TITLE;
    payload: {
        newTitle: string;
    };
};

export type ChangeCurrentAction = {
    type: ActionType.CHANGE_CURRENT;
    payload: {
        newId: string;
    };
};

export type StoreSlideAction = {
    type: ActionType.STORE_SLIDE;
    payload: {
        slide: Slide;
    };
};

export type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE;
    payload: {
        slideId: string;
    };
};

export type MoveSlideAction = {
    type: ActionType.MOVE_SLIDE;
    payload: {
        slideId: string;
        newIndex: number;
    };
};

// Slide

export type RemoveElementAction = {
    type: ActionType.REMOVE_ELEMENT;
    payload: {
        slideId: string;
        elementId: string;
    };
};

export type ChangeRelativeAction = {
    type: ActionType.CHANGE_RELATIVE;
    payload: {
        slideId: string;
        newRelative: Position;
    };
};

export type ChangeScaleAction = {
    type: ActionType.CHANGE_SCALE;
    payload: {
        slideId: string;
        newScale: number;
    };
};

export type UpdateSlideBackgroundAction = {
    type: ActionType.UPDATE_SLIDE_BACKGROUND;
    payload: {
        slideId: string;
        newBackground: string;
    };
};

export type StoreElementAction = {
    type: ActionType.STORE_ELEMENT;
    payload: StoreElementInput;
};

// Element

export type UpdateElementPositionAction = {
    type: ActionType.UPDATE_ELEMENT_POSITION;
    payload: {
        elementId: string;
        newPosition: Position;
    };
};

export type UpdateElementSizeAction = {
    type: ActionType.UPDATE_ELEMENT_SIZE;
    payload: {
        elementId: string;
        newSize: Size;
    };
};

// Text

export type UpdateTextElementAction = {
    type: ActionType.UPDATE_TEXT_ELEMENT;
    payload: {
        elementId: string;
        parameters: {
            type?: "text";
            content?: string;
            fontSize?: number;
            fontFamily?: string;
            color?: string;
        };
    };
};

export type EditorAction =
    | UpdatePresentationTitleAction
    | ChangeCurrentAction
    | StoreSlideAction
    | RemoveSlideAction
    | MoveSlideAction

    | RemoveElementAction
    | ChangeRelativeAction
    | ChangeScaleAction
    | UpdateSlideBackgroundAction
    | StoreElementAction

    | UpdateElementPositionAction
    | UpdateElementSizeAction

    | UpdateTextElementAction;
