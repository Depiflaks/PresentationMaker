import { ImageElement } from "~/store/types/slide/element/Element";
import image from "~/views/assets/elements/image.png"

interface Props {
    element: ImageElement;
}

export default function ImageComponent({element}: Props) {
    return (
        <image
            xlinkHref={image}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
        />
    );
};