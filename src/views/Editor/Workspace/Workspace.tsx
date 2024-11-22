import React from "react";
import { DragType, ImageElement, Position, Slide, TextElement } from "~/store/Types/types";
import ImageComponent from "~/components/ImageComponent";
import TextComponent from "~/components/TextComponent";
import "~/views/Editor/Workspace/Workspace.css";
import { DELTA_SCALE, FIELD, START_POSITION, START_SCALE } from "~/store/Const/CONST";

type Props = {
    slide: Slide|null;
    tool: string;
}

export default function Workspace({slide, tool}: Props) {
    const [scale, setScale] = React.useState<number>(START_SCALE);
    const [relative, setRelative] = React.useState<Position>({...START_POSITION});
    const [isDrag, setIsDrag] = React.useState<boolean>(false);
    const [dragStart, setDragStart] = React.useState<Position>({x: 0, y: 0});
    const [dragEnd, setDragEnd] = React.useState<Position>({x: 0, y: 0});
    const [dragType, setDragType] = React.useState<DragType>('none');

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();

        const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const userX = relative.x + mouseX * (FIELD.width * scale) / rect.width;
        const userY = relative.y + mouseY * (FIELD.height * scale) / rect.height;

        const newScale = Math.max(scale + DELTA_SCALE * (event.deltaY > 0 ? 1 : -1), 0.1);

        const newRelativeX = userX - (mouseX * (FIELD.width * newScale) / rect.width);
        const newRelativeY = userY - (mouseY * (FIELD.height * newScale) / rect.height);

        setScale(newScale);
        setRelative({ x: newRelativeX, y: newRelativeY });
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