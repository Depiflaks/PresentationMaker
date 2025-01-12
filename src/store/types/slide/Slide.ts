import { Position, Rect } from "../Global";
import { Element } from "./element/Element";

export enum AreaType {
    TRANSPARENT_FILL = "#fce181",
    NONE_FILL = "#fff",
}

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
    area: Rect;
    areaType: AreaType;
    elements: string[];
}