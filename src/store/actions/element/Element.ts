import { Editor } from "~/store/types/Editor";
import { storeSlide } from "../editor/Editor";
import {
    UpdateElementsRectInput,
    UpdateElementZIndexInput,
} from "~/store/input/element/ElementInputs";
import { AreaType, Elements, Slide } from "~/store/types/slide/Slide";
import { EditorService } from "~/views/hooks/workspace/service/EditorService";
import { Element } from "~/store/types/slide/element/Element";

export function updateElementsRect(
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
    const newSelection = EditorService.rectSelectedItems(newElements, Object.keys(newElements));
    const updatedSlide: Slide = {
        ...slide,
        view: {
            ...slide.view,
            elements: {
                ...slide.view.elements,
                ...newElements
            },
        },
        selection: {
            ...slide.selection,
            area: newSelection,
            areaType: AreaType.NONE_FILL
        }
    };
    return storeSlide(editor, { slide: updatedSlide });
}

export function updateElementZIndex(
    editor: Editor,
    { elementId, newZIndex }: UpdateElementZIndexInput,
): Editor {
    const slide = editor.slides[editor.current];
    const element = slide.view.elements[elementId];

    const newElement: Element = {
        ...element,
        zIndex: newZIndex
    };

    const updatedSlide: Slide = {
        ...slide,
        view: {
            ...slide.view,
            elements: {
                ...slide.view.elements,
                [elementId]: newElement
            },
        },
    };
    return storeSlide(editor, { slide: updatedSlide });
}