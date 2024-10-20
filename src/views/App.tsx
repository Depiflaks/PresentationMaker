import "./App.css";
import React from "react";
import Header from "~/views/Header/Header";
import ToolBar from "~/views/Editor/ToolBar/ToolBar";
import Workspace from "~/views/Editor/Workspace/Workspace";
import SlideList from "~/views/Editor/SlideList/SlideList";
import PropertyEditor from "~/views/Editor/PropertyEditor/PropertyEditor";

import { getTestPresentation } from "~/store/Data/TestPresentation";
import { SelectedTool } from "~/store/Types/types";
import { updatePresentationTitle } from "~/store/Methods/Presentation/Presentation";

function App() {
    const [presentation, setPresentation] = React.useState(getTestPresentation());

    const [currentTool, setCurrentTool] = React.useState<SelectedTool>('none');

    const changeTool = (newArg: SelectedTool) => {
        setCurrentTool((prevArg) => newArg === prevArg ? 'none' : newArg);
    }

    const onTitleChange = (newTitle: string) => {
        setPresentation((prev) => updatePresentationTitle(prev, newTitle));
        console.log(presentation);
    }

    const currentSlide = presentation.slides[presentation.current];
    return (
        <>
            <Header 
                title={presentation.title}
                onTitleChange={onTitleChange}
            />
            <ToolBar current={currentTool} change={changeTool}/>
            <div className="main">
                <SlideList 
                    presentation={presentation} 
                    setPresentation={setPresentation}
                />
                <Workspace slide={currentSlide}/>
                <PropertyEditor slide={currentSlide}/>
            </div>
        </>
    );
};

export default App;
