export type Position = {
    x: number,
    y: number,
}

export type Size = {
    width: number,
    height: number,
}

export interface BaseElement {
    id: number;
    position: Position;
    size: Size;
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

export type Elements = (TextElement | ImageElement)[];

export type Selections = string[];

export interface Slide {
    id: number;
    background: string;
    elements: Elements;
}

export type SlideCollection = Slide[];

export interface Presentation {
    id: number;
    title: string;
    author: string;
    slides: SlideCollection;
    localSlideId: number;
}