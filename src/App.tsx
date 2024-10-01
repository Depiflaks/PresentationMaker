import "./App.css";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

import { presentation } from "./state/Data/data";

// Основной компонент приложения
function App() {
    return (
        <>
            <Header title={presentation.title}/>
            <ToolBar />
            <div className="main">
                <SlideList slides={presentation.slides}/>
                <Workspace slide={presentation.slides[0]}/>
                <PropertyEditor slide={presentation.slides[0]}/>
            </div>
        </>
    );
};

export default App;
