export type Position = {
    x: number,
    y: number,
}

export type Size = {
    width: number,
    height: number,
}

export interface BaseElement {
    id: string;
    position: Position;
    size: Size;
}

export interface TextElement extends BaseElement {
    type: "text";
    content: string;
    fontSize: number;
    fontFamily: string;
}

export interface ImageElement extends BaseElement {
    type: "image";
    src: string;
}

export type Elements = (TextElement | ImageElement)[];

export type Selections = string[];

export interface Slide {
    id: string;
    background: string;
    elements: Elements;
}

export type SlideCollection = Slide[];

export interface Presentation {
    id: string;
    title: string;
    author: string;
    slides: SlideCollection;
    localSlideId: string;
}