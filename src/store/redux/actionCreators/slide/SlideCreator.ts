import { AppendToSelectedListInput, ChangeRelativeInput, ChangeScaleInput, DeleteFromSelectedListInput, RemoveElementsInput, SetSelectionAreaInput, SetSelectedListInput, StoreElementInput, UpdateSlideBackgroundInput, SetSelectionAreaTypeInput } from "~/store/input/slide/SlideInputs";
import { ActionType } from "../../actions";

export function removeElements(input: RemoveElementsInput) {
    return {
        type: ActionType.REMOVE_ELEMENTS,
        payload: input,
    };
}

export function changeRelative(input: ChangeRelativeInput) {
    return {
        type: ActionType.CHANGE_RELATIVE,
        payload: input,
    };
}

export function changeScale(input: ChangeScaleInput) {
    return {
        type: ActionType.CHANGE_SCALE,
        payload: input,
    };
}

export function updateSlideBackground(input: UpdateSlideBackgroundInput) {
    return {
        type: ActionType.UPDATE_SLIDE_BACKGROUND,
        payload: input,
    };
}

export function storeElement(input: StoreElementInput) {
    return {
        type: ActionType.STORE_ELEMENT,
        payload: input,
    };
}

export function setSelectionArea(input: SetSelectionAreaInput) {
    return {
        type: ActionType.SET_SELECTION_AREA,
        payload: input,
    };
}

export function setSelectionAreaType(input: SetSelectionAreaTypeInput) {
    return {
        type: ActionType.SET_SELECTION_AREA_TYPE,
        payload: input,
    };
}

export function setSelectedList(input: SetSelectedListInput) {
    return {
        type: ActionType.SET_SELECTED_LIST,
        payload: input,
    };
}

export function appendToSelectedList(input: AppendToSelectedListInput) {
    return {
        type: ActionType.APPEND_TO_SELECTED_LIST,
        payload: input,
    };
}

export function deleteFromSelectedList(input: DeleteFromSelectedListInput) {
    return {
        type: ActionType.DELETE_FROM_SELECTED_LIST,
        payload: input,
    };
}