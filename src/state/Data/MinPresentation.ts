import { createId } from "../Methods/Generator/Generator";
import { storeSlide } from "../Methods/Presentation/Presentation";
import { createSlide } from "../Methods/Slide/Slide";
import { Presentation } from "../Types/types";


export function getMinPresentation(): Presentation {
    let empty: Presentation = {
        id: createId(),
        author: 'user',
        localSlideId: '',
        order: [],
        title: 'My Banana Presentation',
        slides: {},
    };
    empty = storeSlide(empty, createSlide(0));
    return empty;
}