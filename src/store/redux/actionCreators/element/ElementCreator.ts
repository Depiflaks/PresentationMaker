import { UpdateElementsRectInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../../actions";

export function updateElementRect(input: UpdateElementsRectInput) {
    return {
        type: ActionType.UPDATE_ELEMENT_RECT,
        payload: input,
    };
}