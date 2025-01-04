import { ToolType } from "~/store/types/Presentation";

type Props = {
    current: ToolType;
    value: ToolType;
    imgSrc: string;
    change: (newTool: ToolType) => void;
};

export default function Tool({ current, change, value, imgSrc }: Props) {
    function ucFirst(str: string): string {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
      }
    return (
        <button
            className={current === value ? `selected` : ``}
            onClick={() => {
                change(value);
            }}
            title={ucFirst(value)}
        >
            <img src={imgSrc} />
        </button>
    );
}
