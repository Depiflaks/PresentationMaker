import { ChangeRelativeInput, ChangeScaleInput, RemoveElementInput, StoreElementInput, UpdateSlideBackgroundInput } from "~/store/input/slide/SlideInputs";
import { ActionType } from "../../actions";

export function removeElement(input: RemoveElementInput) {
    return {
        type: ActionType.REMOVE_ELEMENT,
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
