import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../editor/Editor";
import {
    UpdateElementsRectInput,
} from "~/store/input/element/ElementInputs";
import { Elements, Slide } from "~/store/types/slide/Slide";

export function updateElementRect(
    editor: Editor,
    { rectMap }: UpdateElementsRectInput,
): Editor {
    const slide = editor.slides[editor.current];
    const elements = slide.view.elements;

    const newElements: Elements = {};

    for (const id in rectMap) {
        if (!elements[id]) continue;
        newElements[id] = {
            ...elements[id],
            ...rectMap[id]
        }
    }
    const updatedSlide: Slide = {
        ...slide,
        view: {
            ...slide.view,
            elements: {
                ...slide.view.elements,
                ...newElements
            },
        },
    };
    return storeSlide(editor, { slide: updatedSlide });
}