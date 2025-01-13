import { Middleware } from "redux";
import { HistoryType } from "./history";
import { TEMPORARY_PROCEDURES } from "~/store/const/CONST";
import { ActionType } from "~/store/redux/actions";
import { saveEditorToStorage } from "./localStorage";

export const handleMiddleware = (history: HistoryType): Middleware => {
    return (store) => (next) => (action) => {
        const result = next(action);
        const type: ActionType = action.type;
        if (shouldSaveToHistory(type as ActionType)) {
            const editor = store.getState()
            saveEditorToStorage(editor)
            if (type !== ActionType.SET_EDITOR) history.update(editor);
        }
        return result;
    };
};

export function shouldSaveToHistory(actionType: ActionType): boolean {
    return !TEMPORARY_PROCEDURES.includes(actionType);
}