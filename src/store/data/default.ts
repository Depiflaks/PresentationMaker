import { createId } from "../../utils/uuid";
import { createSlide } from "../actions/slide/Slide";
import { Editor } from "../types/Editor";

const slide = createSlide();

export const defaultEditor: Editor = {
    id: createId(),
    author: 'user',
    current: slide.id,
    order: [slide.id],
    title: 'My Banana Presentation',
    slides: {
        [slide.id]: slide
    },
}