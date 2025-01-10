import { UpdateImageElementInput } from "~/store/input/element/image/ImageElementInputs";
import { ActionType } from "~/store/redux/actions";

export function updateImageElement(input: UpdateImageElementInput) {
    return {
        type: ActionType.UPDATE_IMAGE_ELEMENT,
        payload: input,
    };
}
