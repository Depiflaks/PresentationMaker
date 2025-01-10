import { Position, Size } from "../Global";
import { Element } from "./element/Element";


export interface Slide {
    id: string;
    viewport: Viewport;
    selection: Selection;
}

export interface Viewport {
    background: string;
    elements: Elements;
    relative: Position;
    scale: number;
}

export type Elements = Record<string, Element>;

export interface Selection {
    main: {
        start: Position;
        size: Size;
    }
    elements: string[];
}