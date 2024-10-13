import { ImageElement, Position } from "../../state/Types/types";

import image from "../../assets/elements/image.png"

interface Props {
    element: ImageElement;
    scale: number,
    relative: Position
}

export default function ImageComponent({element, scale, relative}: Props) {
    return (
        <image
            xlinkHref={image}
            x={element.position.x + relative.x}
            y={element.position.y + relative.y}
            width={element.size.width * scale}
            height={element.size.height * scale}
            
            // Добавь другие необходимые атрибуты и стили
        />
    );
};