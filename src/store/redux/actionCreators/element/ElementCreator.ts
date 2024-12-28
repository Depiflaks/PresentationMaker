import { UpdateElementPositionInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../../actions";

export function updateElementPosition(input: UpdateElementPositionInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_POSITION,
        payload: input,
    };
}

export function updateElementSize(input: UpdateElementPositionInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_SIZE,
        payload: input,
    };
}