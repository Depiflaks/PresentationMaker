import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../editor/Editor";
import { createId } from "../../../utils/uuid";
import {
    CreateElementInput,
    UpdateElementPositionInput,
    UpdateElementSizeInput,
} from "~/store/input/element/ElementInputs";
import { Element } from "~/store/types/slide/element/Element";
import { Slide } from "~/store/types/slide/Slide";

export function createElement(properties: CreateElementInput): Element {
    return { ...properties, id: createId() };
}

export function updateElementPosition(
    editor: Editor,
    { elementId, newPosition }: UpdateElementPositionInput,
): Editor {
    const slide = editor.slides[editor.current];
    const element = slide.view.elements[elementId];
    if (!element) return editor;

    const updatedElement = { ...element, position: newPosition };

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

export function updateElementSize(
    editor: Editor,
    { elementId, newSize }: UpdateElementSizeInput,
): Editor {
    const slide = editor.slides[editor.current];
    const element = slide.view.elements[elementId];
    if (!element) return editor;

    const updatedElement = { ...element, size: newSize };
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
