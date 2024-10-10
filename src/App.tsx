import "./App.css";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

import { getMinPresentation } from "./state/Data/MinPresentation";
import React from "react";
import { getTestPresentation } from "./state/Data/TestPresentation";

function App() {
    //const presentation = {...minPresentation};
    const [presentation, setPresentation] = React.useState(getTestPresentation());

    //const [selectedTool, setselectedTool] = React.useState("selection");
    console.log(presentation.slides, presentation.current)
    return (
        <>
            <Header title={presentation.title}/>
            <ToolBar />
            <div className="main">
                <SlideList 
                    slides={presentation.slides} 
                    order={presentation.order}
                />
                <Workspace slide={presentation.slides[presentation.current]}/>
                <PropertyEditor slide={presentation.slides[presentation.current]}/>
            </div>
        </>
    );
};

export default App;
