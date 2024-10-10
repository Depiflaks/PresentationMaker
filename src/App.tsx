import "./App.css";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

import { minPresentation } from "./state/Data/data";
import React from "react";

function App() {
    //const presentation = {...minPresentation};
    const [presentation, setPresentation] = React.useState({...minPresentation});

    //const [selectedTool, setselectedTool] = React.useState("selection");

    return (
        <>
            <Header title={presentation.title}/>
            <ToolBar />
            <div className="main">
                <SlideList 
                    slides={presentation.slides} 
                    // currentSlide={selectedSlide} 
                    // changeHandle={changeSlide}
                />
                <Workspace slide={presentation.slides[0]}/>
                <PropertyEditor slide={presentation.slides[0]}/>
            </div>
        </>
    );
};

export default App;
