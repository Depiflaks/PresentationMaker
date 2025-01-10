import { TextElement } from "~/store/types/slide/element/Element"

type Props = {
    element: TextElement,
}

export default function TextComponent({element} : Props) {
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
            {element.content}
        </text>
    )
}