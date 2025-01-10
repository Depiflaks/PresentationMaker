import { ImageElement } from "~/store/types/slide/element/Element";

interface Props {
    element: ImageElement;
}

export default function ImageComponent({element}: Props) {
    return (
        <image
            href={element.href}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            preserveAspectRatio={element.aspectRatio ? `xMinYMin meet` : `none`}
        />
    );
};