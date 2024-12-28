import { defaultEditor } from "~/store/data/default"
import { Editor } from "~/store/types/Editor"
import { ActionType, EditorAction } from "../actions"
import { changeCurrentSlide } from "~/store/actions/presentation/Presentation"

function editorReducer(editor: Editor = defaultEditor, action: EditorAction): Editor {
    switch (action.type) {
        case ActionType.CHANGE_CURRENT_SLIDE: 
            return changeCurrentSlide(editor, action.payload)
        default:
            return editor
    }
}

export {
    editorReducer,
}