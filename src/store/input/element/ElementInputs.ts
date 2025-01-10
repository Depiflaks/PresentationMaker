import { Position, Size } from "../../types/Global";

export type UpdateElementPositionInput = {
    elementId: string;
    newPosition: Position;
};

export type UpdateElementSizeInput = {
    elementId: string;
    newSize: Size;
};
