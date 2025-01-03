import { defaultEditor } from "../data/default";
import { Editor } from "../types/Editor";

export function loadEditorFromStorage(): Editor {
    const savedState = localStorage.getItem("editorState");
    console.log(JSON.parse(savedState))
    return savedState === undefined ? JSON.parse(savedState) : defaultEditor;
}

export function saveEditorToStorage(editor: Editor): void {
    console.log(editor);
    localStorage.setItem("editorState", JSON.stringify(editor));
}