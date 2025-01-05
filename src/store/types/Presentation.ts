export type Position = {
    x: number,
    y: number,
}

export type Size = {
    width: number,
    height: number,
}

export type SelectedTool = 'hand' | 'selection' | 'zoom' | 'text' | 'image' | 'none';

export enum ToolType {
    HAND = "hand",
    SELECTION = "selection",
    ZOOM = 'zoom',
    TEXT = 'text',
    IMAGE = 'image',
    IMPORT = 'import',
    EXPORT = 'export',
    SETTINGS = 'settings',
    NONE = 'none'
};

export type DragType = 'selection' | 'move' | 'none';

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

export type Element = TextElement | ImageElement;

export type Elements = Record<string, Element>;

export type Selection = {
    main: {
        position: Position;
        size: Size;
    }
    elements: {
        position: Position;
        size: Size;
        id: string
    }[]
}

export type Selections = string[];

export interface Slide {
    id: string;
    background: string;
    elements: Elements;
    scale: number;
    relative: Position;
}

export type SlideCollection = Record<string, Slide>;

export interface Presentation {
    id: string;
    title: string;
    author: string;
    order: string[];
    slides: SlideCollection;
    current: string;
}