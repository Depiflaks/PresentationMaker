import React from "react";
import { ImageElement, Position, Size, Slide, TextElement } from "~/store/Types/types";
import ImageComponent from "~/components/ImageComponent";
import TextComponent from "~/components/TextComponent";
import "~/views/Editor/Workspace/Workspace.css";

type Props = {
    slide: Slide|null;
    tool: string;
}

const FIELD: Size = {
    width: 1600,
    height: 900
}

const START_SCALE: number = 1.1;

const DELTA_SCALE: number = 0.05;

const START_POSITION: Position = {
    x: FIELD.width * (1 - START_SCALE) / 2,
    y: FIELD.height * (1 - START_SCALE) / 2
}

export default function Workspace({slide, tool}: Props) {
    const [scale, setScale] = React.useState<number>(START_SCALE);
    const [relative, setRelative] = React.useState<Position>({...START_POSITION});

    const deltaScale: number = DELTA_SCALE;

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        setScale((prev: number) => prev + (deltaScale * (event.deltaY > 0 ? 1 : -1)))
    };

    
    const elements = slide ? Object.values(slide.elements) : [];
    return (
        <div className="workspace"
            onWheel={handleWheel}
        >
            {slide && 
            <svg 
                className="canvas-svg" 
                viewBox={`${relative.x} ${relative.y} ${FIELD.width * scale} ${FIELD.height * scale}`}
            >
                <rect
                    x={0}
                    y={0}
                    width={FIELD.width}
                    height={FIELD.height}
                    fill={slide.background}
                />
                {elements.map((element) => {
                    if (element.type === 'text') {
                        return <TextComponent 
                            key={element.id} 
                            element={element as TextElement} 
                        />
                    }
                    if (element.type === 'image') {
                        return <ImageComponent 
                            key={element.id} 
                            element={element as ImageElement} 
                        />
                    }
                })}
            </svg>}
        </div>
    );
};