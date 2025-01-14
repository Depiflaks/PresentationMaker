import { TextElement } from "~/store/types/slide/element/Element";

type Props = {
    element: TextElement;
};

export default function TextComponent({ element }: Props) {
    const lines = element.content.split("\n");
    return (
        <text
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            fontSize={element.fontSize}
            fontFamily={element.fontFamily}
            fill={element.color}
            dominantBaseline="text-before-edge"
        >
            {lines.map((line, index) => (
                <tspan key={index} x={element.x} dy={index === 0 ? 0 : element.fontSize}>
                    {line === "" ? " " : line}
                </tspan>
            ))}
        </text>
    );
}
