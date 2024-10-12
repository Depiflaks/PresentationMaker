import "./App.css";
import React from "react";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

import { getTestPresentation } from "./state/Data/TestPresentation";
import { SelectedTool } from "./state/Types/types";

function App() {
    //const presentation = {...minPresentation};
    const [presentation, setPresentation] = React.useState(getTestPresentation());

    const [currentTool, setCurrentTool] = React.useState<SelectedTool>('none');

    const changeTool = (newArg: SelectedTool) => {
        setCurrentTool((prevArg) => newArg === prevArg ? 'none' : newArg);
    }

    return (
        <>
            <Header title={presentation.title}/>
            <ToolBar current={currentTool} change={changeTool}/>
            <div className="main">
                <SlideList 
                    presentation={presentation} 
                    setPresentation={setPresentation}
                />
                <Workspace slide={presentation.slides[presentation.current]}/>
                <PropertyEditor slide={presentation.slides[presentation.current]}/>
            </div>
        </>
    );
};

export default App;
