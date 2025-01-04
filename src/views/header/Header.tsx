import icon from "~/views/assets/logo.svg";
import save from "~/views/assets/Header/save.svg";
import logout from "~/views/assets/Header/logout.svg";
import "./Header.css";
import { useRef } from "react";

type Props = {
    title: string
    onTitleChange: (newTitle: string) => void
}

export default function Header({title, onTitleChange}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <header className="header">
            <div className="header-child header-left">
                <img src={icon} alt="Logo" className="logo" />
                <input
                    ref={inputRef}
                    type="text"
                    defaultValue={title}
                    className="title-input"
                    onChange={() => {onTitleChange(inputRef.current?.value ?? "");}}
                />
            </div>
            <div className="header-center"> 
                <h1>
                    BANANA <span className="maker-text">MAKER</span>
                </h1>
            </div>
            <div className="header-child header-right">
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
