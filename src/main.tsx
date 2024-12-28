import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./views/App.tsx";
import "./index.css";
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";
import { store } from "./store/redux/store.ts";

const root = createRoot(document.getElementById("root")!);


function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </StrictMode>
    );
}


addEditorChangeHandler(render);
render()