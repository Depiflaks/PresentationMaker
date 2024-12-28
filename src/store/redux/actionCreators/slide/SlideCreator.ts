import { ChangeRelativeInput, ChangeScaleInput, RemoveElementInput, StoreElementInput, UpdateSlideBackgroundInput } from "~/store/input/slide/SlideInputs";
import { ActionType } from "../../actions";

export function RemoveElement(input: RemoveElementInput) {
    return {
        type: ActionType.REMOVE_ELEMENT,
        payload: input,
    };
}

export function ChangeRelative(input: ChangeRelativeInput) {
    return {
        type: ActionType.CHANGE_RELATIVE,
        payload: input,
    };
}

export function ChangeScale(input: ChangeScaleInput) {
    return {
        type: ActionType.CHANGE_SCALE,
        payload: input,
    };
}

export function UpdateSlideBackground(input: UpdateSlideBackgroundInput) {
    return {
        type: ActionType.UPDATE_SLIDE_BACKGROUND,
        payload: input,
    };
}

export function StoreElement(input: StoreElementInput) {
    return {
        type: ActionType.STORE_ELEMENT,
        payload: input,
    };
}
