import { Slide } from "~/store/types/slide/Slide";
import { Editor } from "../store/types/Editor";
import { createId } from "./uuid";
import { createSlide } from "~/store/actions/slide/Slide";
import { EMPTY_SELECTION } from "~/store/const/CONST";

export function loadEditorFromStorage(): Editor {
    const slide = createSlide();
    const defaultEditor: Editor = {
        id: createId(),
        author: 'user',
        current: slide.id,
        order: [slide.id],
        title: 'My Banana Presentation',
        slides: {
            [slide.id]: slide
        },
    }
    const savedState = localStorage.getItem("editorState");
    if (savedState !== null) {
        return JSON.parse(savedState);
    } else {
        return defaultEditor;
    }
}

export function saveEditorToStorage(editor: Editor): void {
    const updatedEditor = getEditorWithEmptySelections(editor);
    localStorage.setItem("editorState", JSON.stringify(updatedEditor));
    
}

export function getEditorWithEmptySelections(editor: Editor): Editor {
    return {
        ...editor,
        slides: Object.keys(editor.slides).reduce((updatedSlides, slideId) => {
            const slide: Slide = editor.slides[slideId];
            updatedSlides[slideId] = {
                ...slide,
                selection: {...EMPTY_SELECTION},
            };
            return updatedSlides;
        }, {} as Record<string, Slide>),
    };
}