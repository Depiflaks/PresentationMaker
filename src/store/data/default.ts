import { createId } from "../../utils/uuid";
import { createSlide } from "../actions/slide/Slide";
import { Presentation } from "../types/Presentation";
import { changeCurrent, storeSlide } from "../actions/presentation/Presentation";


export function getMinPresentation(): Presentation {
    let empty: Presentation = {
        id: createId(),
        author: 'user',
        current: '',
        order: [],
        title: 'My Banana Presentation',
        slides: {},
    };
    empty = storeSlide(empty, createSlide(0));
    empty = changeCurrent(empty, empty.order[0]);
    return empty;
}