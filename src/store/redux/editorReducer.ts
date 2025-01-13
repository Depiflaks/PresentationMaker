import { Editor } from "~/store/types/Editor"
import { ActionType, EditorAction } from "./actions"
import { changeCurrentSlide, moveSlide, removeSlide, storeSlide, updatePresentationTitle } from "~/store/actions/editor/Editor"
import { appendToSelectedList, changeRelative, changeScale, deleteFromSelectedList, removeElement, setSelectionArea, setSelectedList, storeElement, updateSlideBackground, setSelectionAreaType } from "~/store/actions/slide/Slide";
import { updateElementsRect } from "~/store/actions/element/Element";
import { updateTextElement } from "~/store/actions/element/text/Text";
import { loadEditorFromStorage } from "../../utils/localStorage";
import { updateImageElement } from "../actions/element/image/Image";

export function editorReducer(editor: Editor = loadEditorFromStorage(), action: EditorAction): Editor {
    const updatedEditor = updateReduser(editor, action);
    return updatedEditor;
}



function updateReduser(editor: Editor = loadEditorFromStorage(), action: EditorAction): Editor {
    switch (action.type) {
        case ActionType.SET_EDITOR:
            return {...action.payload};

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

        case ActionType.SET_SELECTION_AREA:
            return setSelectionArea(editor, action.payload);

        case ActionType.SET_SELECTION_AREA_TYPE:
            return setSelectionAreaType(editor, action.payload);

        case ActionType.SET_SELECTED_LIST:
            return setSelectedList(editor, action.payload);
        
        case ActionType.APPEND_TO_SELECTED_LIST:
            return appendToSelectedList(editor, action.payload);

        case ActionType.DELETE_FROM_SELECTED_LIST:
            return deleteFromSelectedList(editor, action.payload);
        
        case ActionType.CHANGE_RELATIVE:
            return changeRelative(editor, action.payload);

        case ActionType.CHANGE_SCALE:
            return changeScale(editor, action.payload);

        case ActionType.UPDATE_SLIDE_BACKGROUND:
            return updateSlideBackground(editor, action.payload);

        case ActionType.STORE_ELEMENT:
            return storeElement(editor, action.payload);

        case ActionType.UPDATE_ELEMENT_RECT:
            return updateElementsRect(editor, action.payload);

        case ActionType.UPDATE_TEXT_ELEMENT:
            return updateTextElement(editor, action.payload);

        case ActionType.UPDATE_IMAGE_ELEMENT:
            return updateImageElement(editor, action.payload);

        default:
            return editor;
    }
}