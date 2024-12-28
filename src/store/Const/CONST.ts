import { Position, Size } from "~/store/types/Presentation";

export const FIELD: Size = {
    width: 1600,
    height: 900
}

export const START_SCALE: number = 1.1;

export const DELTA_SCALE: number = 0.1;

export const START_POSITION: Position = {
    x: FIELD.width * (1 - START_SCALE) / 2,
    y: FIELD.height * (1 - START_SCALE) / 2
}