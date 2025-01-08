import { useState } from "react";
import { ImageElement, Slide, TextElement } from "~/store/types/Presentation";
import ImageComponent from "~/views/components/ImageComponent";
import TextComponent from "~/views/components/TextComponent";
import styles from "./SlidePreview.module.css";

import remove from "~/views/assets/slideList/remove.svg";
import { FIELD } from "~/store/const/CONST";

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
            className={`${styles.preview} ${isSelected && styles.selected}`} 
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
                className={styles.svg}
                viewBox="0 0 1600 900"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x={ 0 } y={ 0 } width={FIELD.width} height={FIELD.height} fill={slide.background} shapeRendering="crispEdges" />

                {elements.map((element, i) => {
                    if (element.type === 'text') {
                        return <TextComponent key={i} element={element as TextElement}/>
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={i} element={element as ImageElement}/>
                    }
                })}
            </svg>
            {isHovered && isSelected && (
                <div className={styles.delete}
                    onClick={() => {onDelete()}}
                >
                    <img src={remove} />
                </div>
            )}
        </div>
    );
}