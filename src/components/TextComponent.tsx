import { Position, TextElement } from "~/store/Types/types"

type Props = {
    element: TextElement,
    scale: number,
    relative: Position
}

export default function TextComponent({element, scale, relative} : Props) {
    return (
        <text
            x={element.position.x + relative.x}
            y={element.position.y + relative.y}
            fontSize={element.fontSize * scale}
            fontFamily={element.fontFamily}
            fill={element.color}
        >
            {element.content}
        </text>
    )
}