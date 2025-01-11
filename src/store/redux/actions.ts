import {
    UpdatePresentationTitleAction,
    ChangeCurrentSlideAction,
    StoreSlideAction,
    RemoveSlideAction,
    MoveSlideAction,
} from "./actionTypes/Editor";
import {
    UpdateElementRectAction,
    UpdateImageElementAction,
    UpdateTextElementAction,
} from "./actionTypes/Element";
import {
    RemoveElementAction,
    ChangeRelativeAction,
    ChangeScaleAction,
    UpdateSlideBackgroundAction,
    StoreElementAction,
    SetSelectionAreaAction,
    SetSelectedListAction,
    AppendToSelectedListAction,
    DeleteFromSelectedListAction,
} from "./actionTypes/Slide";

export enum ActionType {
    UPDATE_PRESENTATION_TITLE = "updatePresentationTitle",
    CHANGE_CURRENT_SLIDE = "changeCurrentSlide",
    STORE_SLIDE = "storeSlide",
    REMOVE_SLIDE = "removeSlide",
    MOVE_SLIDE = "moveSlide",

    CHANGE_RELATIVE = "changeRelative",
    CHANGE_SCALE = "changeScale",

    SET_SELECTION_AREA = "setSelectionArea",
    SET_SELECTED_LIST = "setSelectedList",
    APPEND_TO_SELECTED_LIST = "appendToSelectedList",
    DELETE_FROM_SELECTED_LIST = "deleteFromSelectedList",

    REMOVE_ELEMENT = "removeElement",
    UPDATE_SLIDE_BACKGROUND = "updateSlideBackground",
    STORE_ELEMENT = "storeElement",

    UPDATE_ELEMENT_RECT = "updateElementRect",

    UPDATE_TEXT_ELEMENT = "updateTextElement",
    UPDATE_IMAGE_ELEMENT = "updateImageElement",
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
    | UpdateElementRectAction
    | UpdateTextElementAction
    | UpdateImageElementAction
    | SetSelectionAreaAction
    | SetSelectedListAction
    | AppendToSelectedListAction
    | DeleteFromSelectedListAction;
