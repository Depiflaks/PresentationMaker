import { SlideCollection } from "../../state/Types/types";
import "./SlideList.css";
import SlidePreview from "./SlidePreview/SlidePreview";

type Props = {slides: SlideCollection}

// Компонент SlideList
export default function SlideList({slides}: Props) {
    return (
        <div className="slide-list">
            <h3>Slides</h3>
            <div className="slide-container">
                {slides.map((slide, i) => (
                    <SlidePreview key={i} slide={slide}/>
                ))}
                <div className="add-button">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
};