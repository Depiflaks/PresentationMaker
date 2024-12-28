import { Presentation } from "./Presentation";
import { Selection } from "./Presentation";

export interface Editor {
    presentation: Presentation;
    selection: Selection;
}