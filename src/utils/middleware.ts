import { Middleware } from "redux";
import { HistoryType } from "./history";
import { HISTORY_UNSAVE, LOCAL_STORAGE_UNSAVE } from "~/store/const/CONST";
import { ActionType } from "~/store/redux/actions";
import { saveEditorToStorage } from "./localStorage";

export const handleMiddleware = (history: HistoryType): Middleware => {
    return (store) => (next) => (action) => {
        const result = next(action);
        const type: ActionType = action.type;
        const editor = store.getState()
        if (shouldSaveToHistory(type as ActionType)) {
            history.update(editor);
        }
        if (shouldSaveToLocalStorage(type as ActionType)) {
            saveEditorToStorage(editor)
        }
        return result;
    };
};

export function shouldSaveToHistory(actionType: ActionType): boolean {
    return !HISTORY_UNSAVE.includes(actionType);
}

export function shouldSaveToLocalStorage(actionType: ActionType): boolean {
    return !LOCAL_STORAGE_UNSAVE.includes(actionType);
}