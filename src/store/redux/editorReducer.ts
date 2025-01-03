import { Editor } from "~/store/types/Editor"
import { ActionType, EditorAction } from "./actions"
import { changeCurrentSlide, moveSlide, removeSlide, storeSlide, updatePresentationTitle } from "~/store/actions/presentation/Presentation"
import { changeRelative, changeScale, removeElement, storeElement, updateSlideBackground } from "~/store/actions/slide/Slide";
import { updateElementPosition, updateElementSize } from "~/store/actions/element/Element";
import { updateTextElement } from "~/store/actions/element/text/Text";
import { loadEditorFromStorage, saveEditorToStorage } from "../storage/LocalStorageHandler";

export function editorReducer(editor: Editor = loadEditorFromStorage(), action: EditorAction): Editor {
    const updatedEditor = updateReduser(editor, action);
    saveEditorToStorage(updatedEditor);
    return updatedEditor;
}

function updateReduser(editor: Editor = loadEditorFromStorage(), action: EditorAction): Editor {
    switch (action.type) {
        case ActionType.UPDATE_PRESENTATION_TITLE:
            return updatePresentationTitle(editor, action.payload);

        case ActionType.CHANGE_CURRENT_SLIDE:
            return changeCurrentSlide(editor, action.payload);

        case ActionType.STORE_SLIDE:
            return storeSlide(editor, action.payload);

        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor, action.payload);

        case ActionType.MOVE_SLIDE:
            return moveSlide(editor, action.payload);

        case ActionType.REMOVE_ELEMENT:
            return removeElement(editor, action.payload);

        case ActionType.CHANGE_RELATIVE:
            return changeRelative(editor, action.payload);

        case ActionType.CHANGE_SCALE:
            return changeScale(editor, action.payload);

        case ActionType.UPDATE_SLIDE_BACKGROUND:
            return updateSlideBackground(editor, action.payload);

        case ActionType.STORE_ELEMENT:
            return storeElement(editor, action.payload);

        case ActionType.UPDATE_ELEMENT_POSITION:
            return updateElementPosition(editor, action.payload);

        case ActionType.UPDATE_ELEMENT_SIZE:
            return updateElementSize(editor, action.payload);

        case ActionType.UPDATE_TEXT_ELEMENT:
            return updateTextElement(editor, action.payload);

        default:
            return editor;
    }
}