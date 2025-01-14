import {
    UpdatePresentationTitleAction,
    ChangeCurrentSlideAction,
    StoreSlideAction,
    RemoveSlideAction,
    MoveSlideAction,
    SetEditorAction,
} from "./actionTypes/Editor";
import {
    UpdateElementRectAction,
    UpdateElementZIndexAction,
    UpdateImageElementAction,
    UpdateTextElementAction,
} from "./actionTypes/Element";
import {
    RemoveElementsAction,
    ChangeRelativeAction,
    ChangeScaleAction,
    UpdateSlideBackgroundAction,
    StoreElementAction,
    SetSelectionAreaAction,
    SetSelectedListAction,
    AppendToSelectedListAction,
    DeleteFromSelectedListAction,
    SetSelectionAreaTypeAction,
} from "./actionTypes/Slide";

export enum ActionType {
    SET_EDITOR = "setEditor",
    UPDATE_PRESENTATION_TITLE = "updatePresentationTitle",
    CHANGE_CURRENT_SLIDE = "changeCurrentSlide",
    STORE_SLIDE = "storeSlide",
    REMOVE_SLIDE = "removeSlide",
    MOVE_SLIDE = "moveSlide",

    CHANGE_RELATIVE = "changeRelative",
    CHANGE_SCALE = "changeScale",

    SET_SELECTION_AREA = "setSelectionArea",
    SET_SELECTION_AREA_TYPE = "setSelectionAreaType",
    SET_SELECTED_LIST = "setSelectedList",
    APPEND_TO_SELECTED_LIST = "appendToSelectedList",
    DELETE_FROM_SELECTED_LIST = "deleteFromSelectedList",

    REMOVE_ELEMENTS = "removeElements",
    UPDATE_SLIDE_BACKGROUND = "updateSlideBackground",
    STORE_ELEMENT = "storeElement",

    UPDATE_ELEMENT_RECT = "updateElementRect",
    UPDATE_ELEMENT_ZINDEX = "updateElementZIndex",

    UPDATE_TEXT_ELEMENT = "updateTextElement",
    UPDATE_IMAGE_ELEMENT = "updateImageElement",
}

export type EditorAction =
    | SetEditorAction
    | UpdatePresentationTitleAction
    | ChangeCurrentSlideAction
    | StoreSlideAction
    | RemoveSlideAction
    | MoveSlideAction
    | RemoveElementsAction
    | ChangeRelativeAction
    | ChangeScaleAction
    | UpdateSlideBackgroundAction
    | StoreElementAction
    | UpdateElementRectAction
    | UpdateElementZIndexAction
    | UpdateTextElementAction
    | UpdateImageElementAction
    | SetSelectionAreaAction
    | SetSelectionAreaTypeAction
    | SetSelectedListAction
    | AppendToSelectedListAction
    | DeleteFromSelectedListAction;
