import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { initHistory } from "~/utils/history";
import { handleMiddleware } from "~/utils/middleware";

const history = initHistory(createStore(editorReducer));

const store = createStore(editorReducer, applyMiddleware(handleMiddleware(history)));

export { store, history };
