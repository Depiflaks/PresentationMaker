import React from "react";

import Header from "~/views/header/Header";
import ToolBar from "~/views/editor/toolBar/ToolBar";
import { ToolType } from "~/store/types/Presentation";

import { useAppSelector } from "./hooks/useAppSelector";
import { useAppActions } from "./hooks/useAppActions";
import Editor from "./editor/Editor";

function App() {
    const presentation = useAppSelector((editor => editor.presentation));
    const { updatePresentationTitle } = useAppActions()
    
    const [currentTool, setCurrentTool] = React.useState<ToolType>(ToolType.HAND);

    const changeTool = (newArg: ToolType) => {
        setCurrentTool((prevArg) => (newArg === prevArg ? ToolType.NONE : newArg));
    };

    const onTitleChange = (newTitle: string) => {
        updatePresentationTitle({newTitle});
    };

    return (
        <>
            <Header title={presentation.title} onTitleChange={onTitleChange} />
            <ToolBar currentTool={currentTool} onToolChange={changeTool} />
            <Editor currentTool={currentTool} />
        </>
    );
}

export default App;
