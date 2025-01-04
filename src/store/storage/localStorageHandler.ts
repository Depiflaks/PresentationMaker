import { defaultEditor } from "../data/default";
import { Editor } from "../types/Editor";

export function loadEditorFromStorage(): Editor {
    const savedState = localStorage.getItem("editorState");
    if (savedState !== null) {
        return JSON.parse(savedState)
    } else {
        return defaultEditor 
    }
}

export function saveEditorToStorage(editor: Editor): void {
    localStorage.setItem("editorState", JSON.stringify(editor));
}