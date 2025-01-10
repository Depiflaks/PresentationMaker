import { AppendToSelectedListInput, ChangeRelativeInput, ChangeScaleInput, DeleteFromSelectedListInput, RemoveElementInput, SetMainSelectionInput, SetSelectedListInput, StoreElementInput, UpdateSlideBackgroundInput } from "~/store/input/slide/SlideInputs";
import { ActionType } from "../actions";

export type ChangeRelativeAction = {
    type: ActionType.CHANGE_RELATIVE;
    payload: ChangeRelativeInput;
};

export type ChangeScaleAction = {
    type: ActionType.CHANGE_SCALE;
    payload: ChangeScaleInput;
};

export type RemoveElementAction = {
    type: ActionType.REMOVE_ELEMENT;
    payload: RemoveElementInput;
};

export type UpdateSlideBackgroundAction = {
    type: ActionType.UPDATE_SLIDE_BACKGROUND;
    payload: UpdateSlideBackgroundInput;
};

export type StoreElementAction = {
    type: ActionType.STORE_ELEMENT;
    payload: StoreElementInput;
};

export type SetMainSelectionAction = {
    type: ActionType.SET_MAIN_SELECTION;
    payload: SetMainSelectionInput;
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