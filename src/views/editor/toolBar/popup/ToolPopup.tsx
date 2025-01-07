import styles from "./ToolPopup.module.css";
import Tool from "../tool/Tool";
import { ToolType } from "~/store/types/Presentation";

type Props = {
    tools: { value: ToolType; imgSrc: string }[];
    onToolChange: (newTool: ToolType) => void;
    onClose: () => void;
};

export default function ToolPopup({ tools, onToolChange }: Props) {
    return (
        <div className={styles.popup}>
            {tools.map((tool, i) => (
                <Tool
                    key={i}
                    current={ToolType.NONE}
                    type={tool.value}
                    imgSrc={tool.imgSrc}
                    change={onToolChange}
                />
            ))}
        </div>
    );
}