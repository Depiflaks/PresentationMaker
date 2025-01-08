import styles from "./Tool.module.css";
import { toolBarIconsMap } from "~/store/icons/toolBar/toolBarIcons";
import { ToolType } from "~/store/types/Presentation";

type Props = {
    currentType: ToolType;
    type: ToolType;
    onToolChange: (newTool: ToolType) => void;
};

function ucFirst(str: string): string {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

export default function Tool({ currentType, onToolChange, type }: Props) {
    return (
        <button
            className={`${currentType === type ? styles.selected : ``}
            ${styles.tool}`}
            onClick={() => {
                onToolChange(type);
            }}
            title={ucFirst(type)}
        >
            <img src={toolBarIconsMap[type]} />
        </button>
    );
}
