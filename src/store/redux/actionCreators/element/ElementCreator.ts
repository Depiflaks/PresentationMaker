import { UpdateElementPositionInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../../actions";

export function UpdateElementPosition(input: UpdateElementPositionInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_POSITION,
        payload: input,
    };
}

export function UpdateElementSize(input: UpdateElementPositionInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_SIZE,
        payload: input,
    };
}