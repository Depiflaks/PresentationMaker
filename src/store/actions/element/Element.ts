import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../presentation/Presentation";
import { createId } from "../../../utils/uuid";
import { CreateElementInput, UpdateElementPositionInput, UpdateElementSizeInput } from "~/store/input/element/ElementInputs";
import { Element } from "~/store/types/Presentation";


export function createElement(properties: CreateElementInput): Element {
    return {...properties, id: createId()}
}

export function updateElementPosition(editor: Editor, { elementId, newPosition }: UpdateElementPositionInput): Editor {
    const slide = editor.presentation.slides[editor.presentation.current];
    const element = slide.elements[elementId];
    if (!element) return editor;

    const updatedElement = { ...element, position: newPosition };
    const updatedSlide = {
        ...slide,
        elements: {
            ...slide.elements,
            [elementId]: updatedElement,
        },
    };

    return storeSlide(editor, { slide: updatedSlide });
}

export function updateElementSize(editor: Editor, { elementId, newSize }: UpdateElementSizeInput): Editor {
    const slide = editor.presentation.slides[editor.presentation.current];
    const element = slide.elements[elementId];
    if (!element) return editor;

    const updatedElement = { ...element, size: newSize };
    const updatedSlide = {
        ...slide,
        elements: {
            ...slide.elements,
            [elementId]: updatedElement,
        },
    };

    return storeSlide(editor, { slide: updatedSlide });
}
