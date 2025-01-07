import { ToolType } from "~/store/types/Presentation";

type Props = {
    current: ToolType;
    type: ToolType;
    imgSrc: string;
    change: (newTool: ToolType) => void;
};

export default function Tool({ current, change, type, imgSrc }: Props) {
    function ucFirst(str: string): string {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
      }
    return (
        <button
            className={current === type ? `selected` : ``}
            onClick={() => {
                change(type);
            }}
            title={ucFirst(type)}
        >
            <img src={imgSrc} />
        </button>
    );
}
