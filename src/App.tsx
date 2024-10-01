import "./App.css";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

import { minPresentation } from "./state/Data/data";
import React from "react";
import { updatePresentationTitle } from "./state/Methods/methods";

function App() {
    //const presentation = {...minPresentation};
    const [presentation, setPresentation] = React.useState({...minPresentation});
    const changePresentationNameHandler = (newName: string) => {
        setPresentation((prev) => {
            return updatePresentationTitle(prev, newName)
        })
    }
    const [selectedTool, setselectedTool] = React.useState("selection");
    const [selectedSlide, setSelectedSlide] = React.useState(0);
    const [selectedObjects, setSelectedObjects] = React.useState(null);
    
    const changeSlide = (newInd: number): void => {
        setSelectedSlide(newInd);

    }

    return (
        <>
            <Header title={presentation.title}/>
            <ToolBar />
            <div className="main">
                <SlideList 
                    slides={presentation.slides} 
                    currentSlide={selectedSlide} 
                    changeHandle={changeSlide}
                />
                <Workspace slide={presentation.slides[0]}/>
                <PropertyEditor slide={presentation.slides[0]}/>
            </div>
        </>
    );
};

export default App;
