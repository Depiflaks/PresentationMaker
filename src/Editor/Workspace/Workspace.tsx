import React, { useRef } from "react";
import { ImageElement, Position, Size, Slide, TextElement } from "../../state/Types/types";
import ImageComponent from "../components/ImageComponent";
import TextComponent from "../components/TextComponent";
import "./Workspace.css";

type Props = {
    slide: Slide
}

const FIELD: Size = {
    width: 1600,
    height: 900
}

export default function Workspace({slide}: Props) {
    const [scale, setScale] = React.useState<number>(0.9);

    const deltaScale: number = 0.05;

    const startPosition: Position = {
        x: FIELD.width * (1 - scale) / 2,
        y: FIELD.height * (1 - scale) / 2
    }

    const [relative, setRelative] = React.useState<Position>({...startPosition});
    const elements = Object.values(slide.elements);
    return (
        <div className="workspace">
            <svg className="canvas-svg" viewBox={`0 0 ${FIELD.width} ${FIELD.height}`}>
                <rect
                    x={relative.x}
                    y={relative.y}
                    width={FIELD.width * scale}
                    height={FIELD.height * scale}
                    fill={slide.background}
                />
                {elements.map((element) => {
                    if (element.type === 'text') {
                        return <TextComponent key={element.id} element={element as TextElement} relative={relative} scale={scale} />
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={element.id} element={element as ImageElement} relative={relative} scale={scale} />
                    }
                })}
            </svg>
        </div>
    );
};