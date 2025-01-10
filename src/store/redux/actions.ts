import {
    UpdatePresentationTitleAction,
    ChangeCurrentSlideAction,
    StoreSlideAction,
    RemoveSlideAction,
    MoveSlideAction,
} from "./actionTypes/Editor";
import {
    UpdateElementPositionAction,
    UpdateElementSizeAction,
    UpdateTextElementAction,
} from "./actionTypes/Element";
import {
    RemoveElementAction,
    ChangeRelativeAction,
    ChangeScaleAction,
    UpdateSlideBackgroundAction,
    StoreElementAction,
} from "./actionTypes/Slide";

export enum ActionType {
    UPDATE_PRESENTATION_TITLE = "updatePresentationTitle",
    CHANGE_CURRENT_SLIDE = "changeCurrentSlide",
    STORE_SLIDE = "storeSlide",
    REMOVE_SLIDE = "removeSlide",
    MOVE_SLIDE = "moveSlide",

    CHANGE_RELATIVE = "changeRelative",
    CHANGE_SCALE = "changeScale",

    SET_MAIN_SELECTION = "setMainSelection",
    SET_SELECTED_LIST = "setSelectedList",
    APPEND_TO_SELECTED_LIST = "appendToSelectedList",
    DELETE_FROM_SELECTED_LIST = "deleteFromSelectedList",

    REMOVE_ELEMENT = "removeElement",
    UPDATE_SLIDE_BACKGROUND = "updateSlideBackground",
    STORE_ELEMENT = "storeElement",

    UPDATE_ELEMENT_POSITION = "updateElementPosition",
    UPDATE_ELEMENT_SIZE = "updateElementSize",

    UPDATE_TEXT_ELEMENT = "updateTextElement",
}

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
