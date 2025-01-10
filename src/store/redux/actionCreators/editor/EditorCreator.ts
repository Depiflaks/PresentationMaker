import { ChangeCurrentSlideInput, MoveSlideInput, RemoveSlideInput, StoreSlideInput, UpdatePresentationTitleInput } from "~/store/input/editor/EditorInputs";
import { ActionType } from "../../actions";

export function updatePresentationTitle(input: UpdatePresentationTitleInput) {
    return {
        type: ActionType.UPDATE_PRESENTATION_TITLE,
        payload: input,
    };
}

export function changeCurrentSlide(input: ChangeCurrentSlideInput) {
    return {
        type: ActionType.CHANGE_CURRENT_SLIDE,
        payload: input,
    };
}

export function storeSlide(input: StoreSlideInput) {
    return {
        type: ActionType.STORE_SLIDE,
        payload: input,
    };
}

export function removeSlide(input: RemoveSlideInput) {
    return {
        type: ActionType.REMOVE_SLIDE,
        payload: input,
    };
}

export function moveSlide(input: MoveSlideInput) {
    return {
        type: ActionType.MOVE_SLIDE,
        payload: input,
    };
}
