import "./App.css";
import Header from "./Header/Header";
import ToolBar from "./Editor/ToolBar/ToolBar";
import Workspace from "./Editor/Workspace/Workspace";
import SlideList from "./Editor/SlideList/SlideList";
import PropertyEditor from "./Editor/PropertyEditor/PropertyEditor";

// Основной компонент приложения
function App() {
    return (
        <div className="app">
            <Header />
            <ToolBar />
            <div className="main">
                <SlideList />
                <Workspace />
                <PropertyEditor />
            </div>
        </div>
    );
};

export default App;
