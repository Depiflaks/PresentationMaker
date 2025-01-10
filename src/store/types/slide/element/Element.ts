import { Rect } from "../../Global";

export enum ElementType {
    TEXT = "text",
    IMAGE = "image"
}

export interface BaseElement extends Rect {
    type: ElementType;
    id: string;
    zIndex: number;
}

export interface TextElement extends BaseElement {
    type: ElementType.TEXT;
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}

export interface ImageElement extends BaseElement {
    type: ElementType.IMAGE;
    src: string;
}

export type Element = TextElement | ImageElement;