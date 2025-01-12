import { Store } from "redux";
import { Editor } from "~/store/types/Editor";

type HistoryType = {
    undo: () => Editor | undefined,
    redo: () => Editor | undefined,
    update: () => void,
}

function getLastItem(stack: Array<Editor>): Editor {
    return stack[stack.length - 1]
} 

function initHistory(store: Store<Editor>): HistoryType {
    const undoStack: Array<Editor> = []
    let redoStack: Array<Editor> = []

    let previousEditor = store.getState()

    function update() {
        const editor = store.getState();
        if (editor.shouldSave && (!undoStack.length || previousEditor != editor)) {
            if (editor == getLastItem(undoStack)) {
                undoStack.pop()
                redoStack.push(previousEditor)
            } else if (editor == getLastItem(redoStack)) {
                redoStack.pop()
                undoStack.push(previousEditor)
            } else {
                undoStack.push(previousEditor)
                redoStack = []
            }
            console.log(undoStack, redoStack, editor.shouldSave);
        }
        previousEditor = editor
    }

    function undo() {
        return getLastItem(undoStack)
    }

    function redo() {
        return getLastItem(redoStack)
    }

    return {
        undo,
        redo,
        update
    }
}

export {
    type HistoryType,
    initHistory
}
