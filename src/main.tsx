import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./views/App.tsx";
import "./index.css";
import { store } from "./store/redux/store.ts";
import { initHistory } from "./utils/history.ts";

const root = createRoot(document.getElementById("root")!);

function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App history={initHistory(store)}/>
            </Provider>
        </StrictMode>
    );
}

render();