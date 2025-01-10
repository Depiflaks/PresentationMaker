import { Position, Rect } from "../Global";
import { Element } from "./element/Element";


export interface Slide {
    id: string;
    view: View;
    selection: Selection;
}

export interface View {
    background: string;
    elements: Elements;
    relative: Position;
    scale: number;
}

export type Elements = Record<string, Element>;

export interface Selection {
    main: Rect;
    elements: string[];
}