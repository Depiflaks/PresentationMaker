import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";

const store = createStore(editorReducer)

// store.subscribe(() => {
//     console.log(store.getState());
// })

export {
    store
}