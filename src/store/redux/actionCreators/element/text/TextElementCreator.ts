import { UpdateTextElementInput } from "~/store/input/element/text/TextElementInputs";
import { ActionType } from "~/store/redux/actions";

export function UpdateTextElement(input: UpdateTextElementInput) {
    return {
        type: ActionType.UPDATE_TEXT_ELEMENT,
        payload: input,
    };
}
