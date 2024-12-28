import { ChangeCurrentSlideInput, MoveSlideInput, RemoveSlideInput, StoreSlideInput, UpdatePresentationTitleInput } from "~/store/input/presentation/PresentationInputs";
import { ActionType } from "../../actions";

export function UpdatePresentationTitle(input: UpdatePresentationTitleInput) {
    return {
        type: ActionType.UPDATE_PRESENTATION_TITLE,
        payload: input,
    };
}

export function ChangeCurrentSlide(input: ChangeCurrentSlideInput) {
    return {
        type: ActionType.CHANGE_CURRENT_SLIDE,
        payload: input,
    };
}

export function StoreSlide(input: StoreSlideInput) {
    return {
        type: ActionType.STORE_SLIDE,
        payload: input,
    };
}

export function RemoveSlide(input: RemoveSlideInput) {
    return {
        type: ActionType.REMOVE_SLIDE,
        payload: input,
    };
}

export function MoveSlide(input: MoveSlideInput) {
    return {
        type: ActionType.MOVE_SLIDE,
        payload: input,
    };
}
