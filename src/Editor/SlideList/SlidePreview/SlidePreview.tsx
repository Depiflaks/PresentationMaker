import { ImageElement, Slide, TextElement } from "../../../state/Types/types";
import ImageComponent from "../../components/ImageComponent";
import TextComponent from "../../components/TextComponent";
import "./SlidePreview.css";

type Props = {slide: Slide}

export default function SlidePreview({slide}: Props) {
    const elements = Object.values(slide.elements);
    return (
        <div className="slide-preview">
            <svg
                className="slide-svg"
                viewBox="0 0 1600 900" // Пропорции 16:9
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Базовый фон, например, белый */}
                <rect width="1600" height="900" fill={slide.background} />

                {/* Динамически вставляемый контент */}
                {elements.map((element, i) => {
                    if (element.type === 'text') {
                        return <TextComponent key={i} element={element as TextElement} />
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={i} element={element as ImageElement} />
                    }
                })}
            </svg>
        </div>
    );
}