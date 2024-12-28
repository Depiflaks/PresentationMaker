import React from "react";

import { dispatch } from "~/store/editor";
import TextComponent from "~/views/components/TextComponent";
import ImageComponent from "~/views/components/ImageComponent";
import { changeRelative, changeScale } from "~/store/actions/slide/Slide";
import { DELTA_SCALE, FIELD, START_POSITION, START_SCALE } from "~/store/const/CONST";
import { DragType, ImageElement, Position, Slide, TextElement } from "~/store/types/Presentation";

import "~/views/Editor/Workspace/Workspace.css";

type Props = {
    slide: Slide|null;
    tool: string;
}

export default function Workspace({slide, tool}: Props) {
    if (!slide) return (
        <div className="workspace"></div>
    );
    const [isDrag, setIsDrag] = React.useState<boolean>(false);
    const [dragStart, setDragStart] = React.useState<Position>({x: 0, y: 0});
    const [dragEnd, setDragEnd] = React.useState<Position>({x: 0, y: 0});
    const [dragType, setDragType] = React.useState<DragType>('none');

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const userX = slide.relative.x + mouseX * (FIELD.width * slide.scale) / rect.width;
        const userY = slide.relative.y + mouseY * (FIELD.height * slide.scale) / rect.height;

        const newScale = Math.max(slide.scale + DELTA_SCALE * (event.deltaY > 0 ? 1 : -1), 0.1);

        const newRelativeX = userX - (mouseX * (FIELD.width * newScale) / rect.width);
        const newRelativeY = userY - (mouseY * (FIELD.height * newScale) / rect.height);
        
        dispatch(changeScale, newScale);
        console.log(slide);
        dispatch(changeRelative, { x: newRelativeX, y: newRelativeY });
    };

    const elements = Object.values(slide.elements);
    return (
        <div className="workspace"
            onWheel={handleWheel}
        >
            <svg 
                className="canvas-svg" 
                viewBox={`${slide.relative.x} ${slide.relative.y} ${FIELD.width * slide.scale} ${FIELD.height * slide.scale}`}
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
            </svg>
        </div>
    );
};