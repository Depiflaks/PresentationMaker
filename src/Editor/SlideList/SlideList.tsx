import { SlideCollection } from "../../state/Types/types";
import "./SlideList.css";
import SlidePreview from "./SlidePreview/SlidePreview";
import add from "../../assets/SlideList/add.svg"

type Props = {
    slides: SlideCollection,
    // change: (newArg: (prevArg: number) => number) => void
}

// Компонент SlideList
export default function SlideList({slides}: Props) {
    return (
        <div className="slide-list">
            <h3>Slides {}</h3>
            <div className="slide-container">
                {slides.map((slide, i) => (
                    <SlidePreview key={i} slide={slide}/>
                ))}
                <div className="add-button">
                    <img src={add}/>
                </div>
            </div>
        </div>
    );
};