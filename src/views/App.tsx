import React from "react";

import Header from "~/views/header/Header";
import ToolBar from "~/views/editor/toolBar/ToolBar";
import { ToolType } from "~/store/types/Presentation";

import Editor from "./editor/Editor";

function App() {
    const [currentTool, setCurrentTool] = React.useState<ToolType>(ToolType.HAND);

    const changeTool = (newArg: ToolType) => {
        setCurrentTool((prevArg) => (newArg === prevArg ? ToolType.NONE : newArg));
    };

    return (
        <>
            <Header />
            <ToolBar currentTool={currentTool} onToolChange={changeTool} />
            <Editor currentTool={currentTool} />
        </>
    );
}

export default App;
