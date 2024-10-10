import { createId } from "../Methods/Generator/Generator";
import { changeCurrent, storeSlide } from "../Methods/Presentation/Presentation";
import { createSlide } from "../Methods/Slide/Slide";
import { Presentation } from "../Types/types";


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
    console.log(empty.order[0])
    return empty;
}