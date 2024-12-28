import { UpdateElementPositionInput, UpdateElementSizeInput } from "../input/element/ElementInputs";
import { UpdateTextElementInput } from "../input/element/text/TextElementInputs";
import { ChangeCurrentSlideInput, MoveSlideInput, RemoveSlideInput, StoreSlideInput, UpdatePresentationTitleInput } from "../input/presentation/PresentationInputs";
import { ChangeRelativeInput, ChangeScaleInput, RemoveElementInput, StoreElementInput, UpdateSlideBackgroundInput } from "../input/slide/SlideInputs";

export enum ActionType {
    UPDATE_PRESENTATION_TITLE = "updatePresentationTitle",
    CHANGE_CURRENT_SLIDE = "changeCurrentSlide",
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
    payload: UpdatePresentationTitleInput;
};

export type ChangeCurrentSlideAction = {
    type: ActionType.CHANGE_CURRENT_SLIDE;
    payload: ChangeCurrentSlideInput;
};

export type StoreSlideAction = {
    type: ActionType.STORE_SLIDE;
    payload: StoreSlideInput;
};

export type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE;
    payload: RemoveSlideInput;
};

export type MoveSlideAction = {
    type: ActionType.MOVE_SLIDE;
    payload: MoveSlideInput;
};

// Slide

export type RemoveElementAction = {
    type: ActionType.REMOVE_ELEMENT;
    payload: RemoveElementInput;
};

export type ChangeRelativeAction = {
    type: ActionType.CHANGE_RELATIVE;
    payload: ChangeRelativeInput;
};

export type ChangeScaleAction = {
    type: ActionType.CHANGE_SCALE;
    payload: ChangeScaleInput;
};

export type UpdateSlideBackgroundAction = {
    type: ActionType.UPDATE_SLIDE_BACKGROUND;
    payload: UpdateSlideBackgroundInput;
};

export type StoreElementAction = {
    type: ActionType.STORE_ELEMENT;
    payload: StoreElementInput;
};

// Element

export type UpdateElementPositionAction = {
    type: ActionType.UPDATE_ELEMENT_POSITION;
    payload: UpdateElementPositionInput;
};

export type UpdateElementSizeAction = {
    type: ActionType.UPDATE_ELEMENT_SIZE;
    payload: UpdateElementSizeInput;
};

// Text

export type UpdateTextElementAction = {
    type: ActionType.UPDATE_TEXT_ELEMENT;
    payload: UpdateTextElementInput;
};

export type EditorAction =
    | UpdatePresentationTitleAction
    | ChangeCurrentSlideAction
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
