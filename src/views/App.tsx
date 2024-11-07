import "./App.css";
import React from "react";
import Header from "~/views/Header/Header";
import ToolBar from "~/views/Editor/ToolBar/ToolBar";
import Workspace from "~/views/Editor/Workspace/Workspace";
import PropertyEditor from "~/views/Editor/PropertyEditor/PropertyEditor";

import { Presentation, SelectedTool } from "~/store/Types/types";
import { updatePresentationTitle } from "~/store/Methods/Presentation/Presentation";
import { dispatch } from "~/store/editor";
import SlideList from "./Editor/SlideList/SlideList";

type Props = {
    editor: Presentation;
}

function App({editor}: Props) {

    const [currentTool, setCurrentTool] = React.useState<SelectedTool>('none');

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
                <SlideList 
                    editor={editor} 
                />
                <Workspace slide={currentSlide}/>
                <PropertyEditor slide={currentSlide}/>
            </div>
        </>
    );
};

export default App;
