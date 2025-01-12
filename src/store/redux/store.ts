import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";

const store = createStore(editorReducer)

// store.subscribe(() => {
//     const editor = store.getState();
//     console.log('storage: ', editor.slides[editor.current].selection.elements);
// })

export {
    store
}