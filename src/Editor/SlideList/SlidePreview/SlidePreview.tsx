import { useState } from "react";
import { ImageElement, Slide, TextElement } from "../../../state/Types/types";
import ImageComponent from "../../components/ImageComponent";
import TextComponent from "../../components/TextComponent";
import "./SlidePreview.css";

type Props = {
    slide: Slide,
    isSelected: boolean
    clickHandler: () => void
}

export default function SlidePreview({slide, isSelected, clickHandler}: Props) {
    const elements = Object.values(slide.elements);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div 
            className={`slide-preview ${isSelected ? 'selected' : ''}`} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={clickHandler}
        >
            <svg
                className="slide-svg"
                viewBox="0 0 1600 900" // Пропорции 16:9
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="1600" height="900" fill={slide.background} />

                {elements.map((element, i) => {
                    if (element.type === 'text') {
                        return <TextComponent key={i} element={element as TextElement} relative={{x: 0, y: 0}} scale={1} />
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={i} element={element as ImageElement} relative={{x: 0, y: 0}} scale={1} />
                    }
                })}
            </svg>
            {isHovered && isSelected && (
                <div className="delete-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6m5 4v6m4-6v6" />
                        <line x1="10" y1="4" x2="14" y2="4" />
                        <line x1="10" y1="2" x2="14" y2="2" />
                    </svg>
                </div>
            )}
        </div>
    );
}