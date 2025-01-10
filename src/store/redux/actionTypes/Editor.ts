import {
    UpdatePresentationTitleInput,
    ChangeCurrentSlideInput,
    StoreSlideInput,
    RemoveSlideInput,
    MoveSlideInput,
} from "~/store/input/editor/EditorInputs";
import { ActionType } from "../actions";

export type UpdatePresentationTitleAction = {
    type: ActionType.UPDATE_PRESENTATION_TITLE;
    payload: UpdatePresentationTitleInput;
};

export type ChangeCurrentSlideAction = {
    type: ActionType.CHANGE_CURRENT_SLIDE;
    payload: ChangeCurrentSlideInput;
};

export type StoreSlideAction = {
    type: ActionType.STORE_SLIDE;
    payload: StoreSlideInput;
};

export type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE;
    payload: RemoveSlideInput;
};

export type MoveSlideAction = {
    type: ActionType.MOVE_SLIDE;
    payload: MoveSlideInput;
};
