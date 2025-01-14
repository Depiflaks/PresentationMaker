import { Editor } from "../store/types/Editor";
import { createId } from "./uuid";
import { createSlide } from "~/store/actions/slide/Slide";

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
    localStorage.setItem("editorState", JSON.stringify(editor));
}