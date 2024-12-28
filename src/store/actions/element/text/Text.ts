import { Editor } from "~/store/types/Editor";
import { TextElement } from "~/store/types/Presentation";
import { storeSlide } from "../../presentation/Presentation";
import { UpdateTextElementInput } from "~/store/input/element/text/TextElementInputs";

export function updateTextElement(editor: Editor, { elementId, parameters }: UpdateTextElementInput): Editor {
    const slide = editor.presentation.slides[editor.presentation.current];
    const element = slide.elements[elementId];
    if (!element || element.type !== "text") return editor;

    const updatedElement: TextElement = {
        ...element,
        ...parameters,
    };

    const updatedSlide = {
        ...slide,
        elements: {
            ...slide.elements,
            [elementId]: updatedElement,
        },
    };

    return storeSlide(editor, { slide: updatedSlide });
}
