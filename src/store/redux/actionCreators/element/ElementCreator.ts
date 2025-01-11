import { UpdateElementsPositionInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../../actions";

export function updateElementPosition(input: UpdateElementsPositionInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_POSITION,
        payload: input,
    };
}

export function updateElementSize(input: UpdateElementsPositionInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_SIZE,
        payload: input,
    };
}