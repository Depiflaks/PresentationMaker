import { ImageElement } from "~/store/types/slide/element/Element";
import image from "~/views/assets/elements/image.png"

interface Props {
    element: ImageElement;
}

export default function ImageComponent({element}: Props) {
    return (
        <image
            xlinkHref={image}
            x={element.position.x}
            y={element.position.y}
            width={element.size.width}
            height={element.size.height}
        />
    );
};