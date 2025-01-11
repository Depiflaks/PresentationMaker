import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../editor/Editor";
import {
    UpdateElementsPositionInput,
    UpdateElementSizeInput,
} from "~/store/input/element/ElementInputs";
import { Element } from "~/store/types/slide/element/Element";
import { Elements, Slide } from "~/store/types/slide/Slide";

export function updateElementPosition(
    editor: Editor,
    { elementIds, positionDelta }: UpdateElementsPositionInput,
): Editor {
    const slide = editor.slides[editor.current];
    const elements = slide.view.elements;

    const newElements: Elements = {};

    for (let id of elementIds) {
        if (!elements[id]) continue;
        newElements[id] = {
            ...elements[id],
            x: elements[id].x - positionDelta.x,
            y: elements[id].y - positionDelta.y,
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

export function updateElementSize(
    editor: Editor,
    { elementId, newSize }: UpdateElementSizeInput,
): Editor {
    const slide = editor.slides[editor.current];
    const element = slide.view.elements[elementId];
    if (!element) return editor;

    const updatedElement: Element = { ...element, ...newSize };
    const updatedSlide: Slide = {
        ...slide,
        view: {
            ...slide.view,
            elements: {
                ...slide.view.elements,
                [elementId]: updatedElement,
            },
        },
    };
    return storeSlide(editor, { slide: updatedSlide });
}
