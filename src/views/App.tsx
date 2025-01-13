import React from "react";

import Header from "~/views/header/Header";
import ToolBar from "~/views/editor/toolBar/ToolBar";
import { ToolType } from "~/store/types/Global";

import Editor from "./editor/Editor";
import { HistoryContext } from "./hooks/historyContext";
import { history } from "~/store/redux/store";


function App() {
    const [currentTool, setCurrentTool] = React.useState<ToolType>(ToolType.HAND);

    const changeTool = (newArg: ToolType) => {
        setCurrentTool((prevArg) => (newArg === prevArg ? ToolType.NONE : newArg));
    };

    return (
        <HistoryContext.Provider value={history}>
            <Header />
            <ToolBar currentTool={currentTool} onToolChange={changeTool} />
            <Editor currentTool={currentTool} />
        </HistoryContext.Provider>
    );
}

export default App;
