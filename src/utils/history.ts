import { Store } from "redux";
import { Editor } from "~/store/types/Editor";

export type HistoryType = {
    undo: () => Editor | undefined,
    redo: () => Editor | undefined,
    update: (editor: Editor) => void,
}

function getLastItem(stack: Array<Editor>): Editor {
    return stack[stack.length - 1]
} 

function initHistory(store: Store<Editor>): HistoryType {
    const undoStack: Array<Editor> = []
    let redoStack: Array<Editor> = []

    let previousEditor: Editor = store.getState()

    function update(editor: Editor) {
        undoStack.push(previousEditor);
        redoStack = [];
        previousEditor = {...editor};
    }

    function undo() {
        if (undoStack.length === 0) return {...previousEditor};
        const editor = getLastItem(undoStack);
        undoStack.pop();
        redoStack.push({...previousEditor});
        previousEditor = {...editor};
        return {...editor};
    }

    function redo() {
        if (redoStack.length === 0) return {...previousEditor};
        const editor = getLastItem(redoStack);
        redoStack.pop()
        undoStack.push({...previousEditor})
        previousEditor = {...editor};
        return {...editor};
    }

    return {
        undo,
        redo,
        update
    }
}

export {
    initHistory
}
