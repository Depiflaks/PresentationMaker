import { UpdateElementsPositionInput, UpdateElementSizeInput } from "~/store/input/element/ElementInputs";
import { ActionType } from "../actions";
import { UpdateTextElementInput } from "~/store/input/element/text/TextElementInputs";
import { UpdateImageElementInput } from "~/store/input/element/image/ImageElementInputs";

export type UpdateElementPositionAction = {
    type: ActionType.UPDATE_ELEMENT_POSITION;
    payload: UpdateElementsPositionInput;
};

export type UpdateElementSizeAction = {
    type: ActionType.UPDATE_ELEMENT_SIZE;
    payload: UpdateElementSizeInput;
};

export type UpdateTextElementAction = {
    type: ActionType.UPDATE_TEXT_ELEMENT;
    payload: UpdateTextElementInput;
};

export type UpdateImageElementAction = {
    type: ActionType.UPDATE_IMAGE_ELEMENT;
    payload: UpdateImageElementInput;
};