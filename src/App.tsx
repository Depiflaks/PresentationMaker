import "./App.css";
import React from "react";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

import { getTestPresentation } from "./state/Data/TestPresentation";
import { SelectedTool } from "./state/Types/types";
import { updatePresentationTitle } from "./state/Methods/Presentation/Presentation";

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
