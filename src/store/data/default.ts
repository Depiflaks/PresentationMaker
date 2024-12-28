import { createId } from "../../utils/uuid";
import { createSlide } from "../actions/slide/Slide";
import { Editor } from "../types/Editor";

const slide = createSlide();

export const defaultEditor: Editor = {
    presentation: {
        id: createId(),
        author: 'user',
        current: slide.id,
        order: [slide.id],
        title: 'My Banana Presentation',
        slides: {
            [slide.id]: slide
        },
    },
    selection: {
        main: {
            position: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        },
        elements: []
    }
}