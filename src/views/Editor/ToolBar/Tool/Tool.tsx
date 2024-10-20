import { SelectedTool } from "~/store/Types/types";

type Props = {
    current: SelectedTool;
    value: SelectedTool;
    imgSrc: string;
    change: (newTool: SelectedTool) => void;
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
        >
            <img src={imgSrc} />
            {ucFirst(value)}
        </button>
    );
}
