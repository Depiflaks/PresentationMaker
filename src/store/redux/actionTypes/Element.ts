import { UpdateElementPositionInput, UpdateElementSizeInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../actions";
import { UpdateTextElementInput } from "~/store/input/element/text/TextElementInputs";

export type UpdateElementPositionAction = {
    type: ActionType.UPDATE_ELEMENT_POSITION;
    payload: UpdateElementPositionInput;
};

export type UpdateElementSizeAction = {
    type: ActionType.UPDATE_ELEMENT_SIZE;
    payload: UpdateElementSizeInput;
};

export type UpdateTextElementAction = {
    type: ActionType.UPDATE_TEXT_ELEMENT;
    payload: UpdateTextElementInput;
};