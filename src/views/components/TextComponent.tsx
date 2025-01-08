import { TextElement } from "~/store/types/Presentation"

type Props = {
    element: TextElement,
}

export default function TextComponent({element} : Props) {
    return (
        <text
            x={element.position.x}
            y={element.position.y}
            fontSize={element.fontSize}
            fontFamily={element.fontFamily}
            fill={element.color}
        >
            {element.content}
        </text>
    )
}