import { Position, Size } from "../../types/Global";

export type UpdateElementsPositionInput = {
    elementIds: string[];
    positionDelta: Position;
};

export type UpdateElementSizeInput = {
    elementId: string;
    newSize: Size;
};
