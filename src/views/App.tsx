import "./App.css";
import React from "react";
import Header from "~/views/header/Header";
import ToolBar from "~/views/editor/toolBar/ToolBar";
import Workspace from "~/views/editor/workspace/Workspace";
import PropertyEditor from "~/views/editor/propertyEditor/PropertyEditor";

import { Presentation, SelectedTool } from "~/store/types/Presentation";
import { updatePresentationTitle } from "~/store/actions/Presentation/Presentation";
import { dispatch } from "~/store/editor";
import SlideList from "~/views/editor/slideList/SlideList";

type Props = {
    editor: Presentation;
}

function App({editor}: Props) {

    const [currentTool, setCurrentTool] = React.useState<SelectedTool>('hand');

    const changeTool = (newArg: SelectedTool) => {
        setCurrentTool((prevArg) => newArg === prevArg ? 'none' : newArg);
    }

    const onTitleChange = (newTitle: string) => {
        dispatch(updatePresentationTitle, newTitle);
    }

    const currentSlide = editor.slides[editor.current];
    return (
        <>
            <Header 
                title={editor.title}
                onTitleChange={onTitleChange}
            />
            <ToolBar current={currentTool} change={changeTool}/>
            <div className="main">
                <Workspace slide={currentSlide} tool={currentTool}/>
                <SlideList 
                    editor={editor} 
                />
                <PropertyEditor slide={currentSlide}/>
            </div>
        </>
    );
};

export default App;
