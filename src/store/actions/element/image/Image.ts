import { defaultImageElement } from "~/store/data/default";
import { CreateImageElementInput, UpdateImageElementInput } from "~/store/input/element/image/ImageElementInputs";
import { Editor } from "~/store/types/Editor";
import { ElementType, ImageElement } from "~/store/types/slide/element/Element";
import { Slide } from "~/store/types/slide/Slide";
import { storeSlide } from "../../editor/Editor";
import { createId } from "~/utils/uuid";

export function createImageElement(properties: CreateImageElementInput): ImageElement {
    return {
        ...defaultImageElement,
        ...properties,
        id: createId(),
    };
}

export function updateImageElement(editor: Editor, { parameters, elementId }: UpdateImageElementInput): Editor {
    const slide = editor.slides[editor.current];
    const element = slide.view.elements[elementId];
    if (!element || element.type !== ElementType.IMAGE) return editor;

    const updatedElement: ImageElement = {
        ...element,
        ...parameters,
    };

    const updatedSlide: Slide = {
        ...slide,
        view: {
            ...slide.view,
            elements: {
                ...slide.view.elements,
                [elementId]: updatedElement
            }
        }
    };

    return storeSlide(editor, { slide: updatedSlide });
}
