import icon from "../assets/logo.svg";
import save from "../assets/Header/save.svg";
import logout from "../assets/Header/logout.svg";
import "./Header.css";

// Компонент заголовка
export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <img src={icon} alt="Logo" className="logo" />
                <input
                    type="text"
                    defaultValue="My presentation"
                    className="title-input"
                />
            </div>
            <div className="header-center">
                <h1>
                    PRESENTATION <span className="maker-text">MAKER</span>
                </h1>
            </div>
            <div className="header-right">
                <button className="icon-button">
                    <img src={save} alt="Save" />
                </button>
                <button className="icon-button">
                    <img src={logout} alt="Logout" />
                </button>
            </div>
        </header>
    );
}
