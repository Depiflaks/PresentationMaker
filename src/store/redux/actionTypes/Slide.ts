import { ChangeRelativeInput, ChangeScaleInput, RemoveElementInput, StoreElementInput, UpdateSlideBackgroundInput } from "~/store/input/slide/SlideInputs";
import { ActionType } from "../actions";

export type ChangeRelativeAction = {
    type: ActionType.CHANGE_RELATIVE;
    payload: ChangeRelativeInput;
};

export type ChangeScaleAction = {
    type: ActionType.CHANGE_SCALE;
    payload: ChangeScaleInput;
};

export type RemoveElementAction = {
    type: ActionType.REMOVE_ELEMENT;
    payload: RemoveElementInput;
};

export type UpdateSlideBackgroundAction = {
    type: ActionType.UPDATE_SLIDE_BACKGROUND;
    payload: UpdateSlideBackgroundInput;
};

export type StoreElementAction = {
    type: ActionType.STORE_ELEMENT;
    payload: StoreElementInput;
};