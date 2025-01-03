import { legacy_createStore as createStore, legacy_createStore } from "redux";
import { editorReducer } from "./editorReducer";

console.log(123)
const store = createStore(editorReducer)
export {
    store
}