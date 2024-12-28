import React from "react";

import { dispatch } from "~/store/editor";
import Header from "~/views/header/Header";
import ToolBar from "~/views/editor/toolBar/ToolBar";
import Workspace from "~/views/editor/workspace/Workspace";
import SlideList from "~/views/editor/slideList/SlideList";
import { SelectedTool } from "~/store/types/Presentation";
import PropertyEditor from "~/views/editor/propertyEditor/PropertyEditor";
import { updatePresentationTitle } from "~/store/actions/presentation/Presentation";

import "./App.css";

function App() {
    const [currentTool, setCurrentTool] = React.useState<SelectedTool>("hand");

    const changeTool = (newArg: SelectedTool) => {
        setCurrentTool((prevArg) => (newArg === prevArg ? "none" : newArg));
    };

    const onTitleChange = (newTitle: string) => {
        dispatch(updatePresentationTitle, newTitle);
    };

    const currentSlide = editor.slides[editor.current];
    return (
        <>
            <Header title={editor.title} onTitleChange={onTitleChange} />
            <ToolBar current={currentTool} change={changeTool} />
            <div className="main">
                <Workspace slide={currentSlide} tool={currentTool} />
                <SlideList editor={editor} />
                <PropertyEditor slide={currentSlide} />
            </div>
        </>
    );
}

export default App;
