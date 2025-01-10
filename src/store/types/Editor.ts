import { Slide } from "./slide/Slide";

export interface Editor {
    id: string;
    title: string;
    author: string;
    order: string[];
    slides: SlideCollection;
    current: string;
}

export type SlideCollection = Record<string, Slide>;