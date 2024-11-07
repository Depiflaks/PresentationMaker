import { ImageElement, Slide, TextElement } from "~/store/Types/types";
import ImageComponent from "~/components/ImageComponent";
import TextComponent from "~/components/TextComponent";
import "./SlideThumbnail.css";

type Props = {
    slide: Slide;
};

export default function SlideThumbnail({ slide }: Props) {
    const elements = Object.values(slide.elements);

    return (
        <div className="slide-thumbnail">
            <svg
                className="thumbnail-svg"
                viewBox="0 0 1600 900"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="1600" height="900" fill={slide.background} />
                {elements.map((element, i) => {
                    if (element.type === 'text') {
                        return <TextComponent key={i} element={element as TextElement} relative={{ x: 0, y: 0 }} scale={0.25} />;
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={i} element={element as ImageElement} relative={{ x: 0, y: 0 }} scale={0.25} />;
                    }
                })}
            </svg>
        </div>
    );
}
