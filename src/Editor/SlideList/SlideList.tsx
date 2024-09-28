import { SlideCollection } from "../../state/Types/types";
import "./SlideList.css";

type Props = {slides: SlideCollection}

// Компонент SlideList
export default function SlideList({slides}: Props) {
    return (
        <div className="slide-list">
            <h3>Slides</h3>
            {/* Список слайдов */}
            <ul>
                {slides.map(slide => (
                    <li>Slide {slide.id}</li>
                ))}
            </ul>
        </div>
    );
};