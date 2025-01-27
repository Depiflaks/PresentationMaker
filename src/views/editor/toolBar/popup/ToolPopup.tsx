import styles from "./ToolPopup.module.css";
import Tool from "../tool/Tool";
import { ToolType } from "~/store/types/Global";

type Props = {
    onToolChange: (newTool: ToolType) => void;
    onClose: () => void;
    isPopupOpen: boolean;
};

export default function ToolPopup({ onToolChange, isPopupOpen }: Props) {
    return (
        <div className={`${styles.popup} ${isPopupOpen ? styles.show : ``}`}>
            {/* {POPUP_TOOLS.map((tool, i) => (
                <Tool
                    key={i}
                    currentTool={ToolType.NONE}
                    type={tool}
                    onToolChange={onToolChange}
                />
            ))} */}
        </div>
    );
}