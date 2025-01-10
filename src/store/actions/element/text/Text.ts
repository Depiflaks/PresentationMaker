import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../../editor/Editor";
import { UpdateTextElementInput } from "~/store/input/element/text/TextElementInputs";
import { ElementType, TextElement } from "~/store/types/slide/element/Element";
import { Slide } from "~/store/types/slide/Slide";

export function updateTextElement(editor: Editor, { parameters, elementId }: UpdateTextElementInput): Editor {
    const slide = editor.slides[editor.current];
    const element = slide.view.elements[elementId];
    if (!element || element.type !== ElementType.TEXT) return editor;

    const updatedElement: TextElement = {
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
