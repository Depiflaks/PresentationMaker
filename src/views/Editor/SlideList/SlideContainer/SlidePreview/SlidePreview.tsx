import { useState } from "react";
import { ImageElement, Slide, TextElement } from "~/store/types/Presentation";
import ImageComponent from "~/components/ImageComponent";
import TextComponent from "~/components/TextComponent";
import "./SlidePreview.css";

import remove from "~/views/assets/SlideList/remove.svg";

type Props = {
    slide: Slide,
    isSelected: boolean
    onSlideClick: () => void;
    onDragEnter: () => void;
    onDelete: () => void;
}

export default function SlidePreview({slide, isSelected, onSlideClick, onDragEnter, onDelete}: Props) {
    const elements = Object.values(slide.elements);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div 
            className={`slide-preview ${isSelected && 'selected'}`} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => {onSlideClick()}}
            draggable={true}
            onDragEnter={(event) => {
                event.preventDefault()
                onDragEnter()
            }}
            onDragOver={(event) => {event.preventDefault()}}
        >
            <svg
                className="slide-svg"
                viewBox="0 0 1600 900"
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
                <div className="delete-icon"
                    onClick={() => {onDelete()}}
                >
                    <img src={remove} />
                </div>
            )}
        </div>
    );
}