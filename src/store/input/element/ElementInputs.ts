import { Position, Size } from "../../types/Presentation";

export type CreateElementInput = ImageProp | TextProp;

export type UpdateElementPositionInput = {
    elementId: string;
    newPosition: Position;
};

export type UpdateElementSizeInput = {
    elementId: string;
    newSize: Size;
};

type ImageProp = {
    type: "image";
    position: Position;
    size: Size;
    src: string;
};

type TextProp = {
    type: "text";
    position: Position;
    size: Size;
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
};