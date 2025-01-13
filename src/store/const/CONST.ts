import { Position, Size } from "~/store/types/Global";
import { AreaType, Selection } from "../types/slide/Slide";
import { ActionType } from "../redux/actions";

export const FIELD: Size = {
    width: 1600,
    height: 900
}

export const START_SCALE: number = 1.1;

export const DELTA_SCALE: number = 0.1;

export const TEMPORARY_PROCEDURES: ActionType[] = [
    ActionType.CHANGE_RELATIVE,
    ActionType.CHANGE_SCALE,
    ActionType.SET_SELECTION_AREA,
    ActionType.SET_SELECTED_LIST,
    ActionType.APPEND_TO_SELECTED_LIST,
    ActionType.DELETE_FROM_SELECTED_LIST,
    ActionType.SET_SELECTION_AREA_TYPE,
];

export const START_POSITION: Position = {
    x: FIELD.width * (1 - START_SCALE) / 2,
    y: FIELD.height * (1 - START_SCALE) / 2
}

export const EMPTY_SELECTION: Selection = {
    area: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    elements: [],
    areaType: AreaType.TRANSPARENT_FILL
}