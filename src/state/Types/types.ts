export type Position = {
    x: number,
    y: number,
}

export type Size = {
    width: number,
    height: number,
}

export type SelectedTool = 'hand' | 'selection' | 'zoom' | 'text' | 'image' | 'none';

export interface BaseElement {
    type: string;
    id: string;
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

export type Elements = Record<string, TextElement | ImageElement>;

export type Selections = string[];

export interface Slide {
    id: string;
    background: string;
    elements: Elements;
}

export type SlideCollection = Record<string, Slide>;

export interface Presentation {
    id: string;
    title: string;
    author: string;
    order: string[];
    slides: SlideCollection,
    current: string;
}