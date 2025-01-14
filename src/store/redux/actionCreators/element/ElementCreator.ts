import { UpdateElementsRectInput, UpdateElementZIndexInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../../actions";

export function updateElementRect(input: UpdateElementsRectInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_RECT,
        payload: input,
    };
}

export function updateElementZIndex(input: UpdateElementZIndexInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_ZINDEX,
        payload: input,
    };
}