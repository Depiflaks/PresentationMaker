import { ImageElement, TextElement, Position, Size } from "../../types/Presentation";
import { createId } from "../../../utils/uuid";
import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../presentation/Presentation";

type Element = TextElement | ImageElement;

type ImageProp = {
    type: "image";
    position: Position;
    size: Size;
    src: string;
}

type TextProp = {
    type: "text";
    position: Position;
    size: Size;
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}

export type CreateElementInput = ImageProp | TextProp;

export function createElement(properties: ImageProp | TextProp): Element {
    return {...properties, id: createId()}
}

export type UpdateElementPositionInput = {
    elementId: string;
    newPosition: Position;
};

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

export type UpdateElementSizeInput = {
    elementId: string;
    newSize: Size;
};

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