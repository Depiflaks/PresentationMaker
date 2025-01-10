import { Position, Size } from "../../Global";

export interface BaseElement extends Position, Size {
    type: string;
    id: string;
}

export interface TextElement extends BaseElement {
    type: "text";
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}

export interface ImageElement extends BaseElement {
    type: "image";
    src: string;
}

export type Element = TextElement | ImageElement;