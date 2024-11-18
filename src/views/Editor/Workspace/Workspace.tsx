import React from "react";
import { ImageElement, Position, Size, Slide, TextElement } from "~/store/Types/types";
import ImageComponent from "~/components/ImageComponent";
import TextComponent from "~/components/TextComponent";
import "~/views/Editor/Workspace/Workspace.css";

type Props = {
    slide: Slide|null
}

const FIELD: Size = {
    width: 1600,
    height: 900
}

export default function Workspace({slide}: Props) {
    const [scale, setScale] = React.useState<number>(0.9);

    const deltaScale: number = 0.05;

    const startPosition: Position = {
        x: 0,
        y: 0
    }

    const [relative, setRelative] = React.useState<Position>({...startPosition});
    const elements = slide ? Object.values(slide.elements) : [];
    return (
        <div className="workspace">
            {slide && <svg className="canvas-svg" viewBox={`0 0 1600 900`}>
                <rect
                    x={relative.x}
                    y={relative.y}
                    width={FIELD.width}
                    height={FIELD.height}
                    fill={slide.background}
                />
                {elements.map((element) => {
                    if (element.type === 'text') {
                        return <TextComponent key={element.id} element={element as TextElement} relative={relative} scale={1} />
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={element.id} element={element as ImageElement} relative={relative} scale={1} />
                    }
                })}
            </svg>}
        </div>
    );
};