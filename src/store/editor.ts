import { getTestPresentation } from "./data/test";
import { Presentation } from "./types/Presentation";

export let editor = getTestPresentation();
let editorChangeHandler: Function = (): void => {};

export function getEditor(): Presentation {
    return editor;
}

export function setEditor(newEditor: Presentation): void {
    editor = newEditor;
}

export function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler;
}

export function dispatch(modifyFn: Function, payload: Object): void {
    const newEditor = modifyFn(editor, payload);
    setEditor(newEditor);

    if (editorChangeHandler) {
        editorChangeHandler()
    }
}