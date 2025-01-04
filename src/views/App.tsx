import React from "react";

import Header from "~/views/header/Header";
import ToolBar from "~/views/editor/toolBar/ToolBar";
import Workspace from "~/views/editor/workspace/Workspace";
import SlideList from "~/views/editor/slideList/SlideList";
import { ToolType } from "~/store/types/Presentation";
import PropertyEditor from "~/views/editor/propertyEditor/PropertyEditor";

import "./App.css";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppActions } from "./hooks/useAppActions";

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
            <ToolBar current={currentTool} onToolChange={changeTool} />
            <div className="main">
                <Workspace tool={currentTool} />
                <SlideList />
                <PropertyEditor />
            </div>
        </>
    );
}

export default App;
