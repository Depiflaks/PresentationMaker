import { ElementType } from "~/store/types/slide/element/Element";
import { Position, Rect, Size } from "../../types/Global";

export type CreateElementInput = ImageProp | TextProp;

export type UpdateElementPositionInput = {
    elementId: string;
    newPosition: Position;
};

export type UpdateElementSizeInput = {
    elementId: string;
    newSize: Size;
};

interface ImageProp extends Rect {
    type: ElementType.IMAGE;
    src: string;
    aspectRatio: boolean;
};

interface TextProp extends Rect {
    type: ElementType.TEXT;
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
};