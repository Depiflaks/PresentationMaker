import hand from "../../assets/ToolBar/hand.svg";
import image from "../../assets/ToolBar/image.svg";
import cursor from "../../assets/ToolBar/cursor.svg";
import text from "../../assets/ToolBar/text.svg";
import zoom from "../../assets/ToolBar/zoom.svg";

import "./ToolBar.css";

// Компонент ToolBar с SVG-кнопками
export default function ToolBar() {
    return (
        <div className="toolbar">
            <button>
                <img src={hand}/>
                Hand
            </button>
            <button>
                <img src={cursor}/>
                Selection
            </button>
            <button>
                <img src={zoom}/>
                Zoom
            </button>
            <button>
                <img src={text}/>
                Text
            </button>
            <button>
                <img src={image}/>
                Image
            </button>
        </div>
    );
};