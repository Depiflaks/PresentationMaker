import { AppendToSelectedListInput, ChangeRelativeInput, ChangeScaleInput, DeleteFromSelectedListInput, RemoveElementsInput, SetSelectionAreaInput, SetSelectedListInput, StoreElementInput, UpdateSlideBackgroundInput, SetSelectionAreaTypeInput } from "~/store/input/slide/SlideInputs";
import { ActionType } from "../actions";

export type ChangeRelativeAction = {
    type: ActionType.CHANGE_RELATIVE;
    payload: ChangeRelativeInput;
};

export type ChangeScaleAction = {
    type: ActionType.CHANGE_SCALE;
    payload: ChangeScaleInput;
};

export type RemoveElementsAction = {
    type: ActionType.REMOVE_ELEMENTS;
    payload: RemoveElementsInput;
};

export type UpdateSlideBackgroundAction = {
    type: ActionType.UPDATE_SLIDE_BACKGROUND;
    payload: UpdateSlideBackgroundInput;
};

export type StoreElementAction = {
    type: ActionType.STORE_ELEMENT;
    payload: StoreElementInput;
};

export type SetSelectionAreaAction = {
    type: ActionType.SET_SELECTION_AREA;
    payload: SetSelectionAreaInput;
}

export type SetSelectionAreaTypeAction = {
    type: ActionType.SET_SELECTION_AREA_TYPE;
    payload: SetSelectionAreaTypeInput;
}

export type SetSelectedListAction = {
    type: ActionType.SET_SELECTED_LIST;
    payload: SetSelectedListInput;
}

export type AppendToSelectedListAction = {
    type: ActionType.APPEND_TO_SELECTED_LIST;
    payload: AppendToSelectedListInput;
}

export type DeleteFromSelectedListAction = {
    type: ActionType.DELETE_FROM_SELECTED_LIST;
    payload: DeleteFromSelectedListInput;
}