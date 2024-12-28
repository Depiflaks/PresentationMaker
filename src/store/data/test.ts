import { createId } from "../../utils/uuid";
import { changeCurrentSlide, storeSlide } from "../actions/presentation/Presentation";
import { createSlide } from "../actions/slide/Slide";
import { Presentation } from "../types/Presentation";


export function getTestPresentation(): Presentation {
    let empty: Presentation = {
        id: createId(),
        author: 'user',
        current: '',
        order: [],
        title: 'My Banana Presentation',
        slides: {},
    };
    empty = storeSlide(empty, createSlide(0));
    empty = storeSlide(empty, createSlide(1));
    empty = storeSlide(empty, createSlide(2));
    empty = changeCurrentSlide(empty, empty.order[0]);
    return empty;
}