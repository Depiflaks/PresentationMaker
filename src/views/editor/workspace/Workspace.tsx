import React from "react";

import TextComponent from "~/views/components/TextComponent";
import ImageComponent from "~/views/components/ImageComponent";
import { DELTA_SCALE, FIELD, START_POSITION, START_SCALE } from "~/store/const/CONST";
import { DragType, ImageElement, Position, TextElement } from "~/store/types/Presentation";

import "~/views/editor/workspace/Workspace.css";
import { useAppSelector } from "~/views/hooks/useAppSelector";
import { useAppActions } from "~/views/hooks/useAppActions";

type Props = {
    tool: string;
}

export default function Workspace({ tool }: Props) {
    const presentation = useAppSelector((editor => editor.presentation));
    if (presentation.current === "") return (
        <div className="workspace"></div>
    );

    const slide = presentation.slides[presentation.current];

    const { changeScale, changeRelative } = useAppActions()
    
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
        
        changeScale({slideId: slide.id, newScale: newScale});
        changeRelative({
            slideId: slide.id,
            newRelative: {
                x: newRelativeX,
                y: newRelativeY
            }
        });
    };

    const elements = Object.values(slide.elements);
    const roundedScale = Math.round(slide.scale * 100) / 100;
    return (
        <div className="workspace"
            onWheel={handleWheel}
        >
            <svg 
                className="canvas-svg" 
                viewBox={`${Math.round(slide.relative.x)} ${Math.round(slide.relative.y)} ${Math.round(FIELD.width * roundedScale)} ${Math.round(FIELD.height * roundedScale)}`}
            >
                <rect
                    x={ 0 }
                    y={ 0 }
                    width={FIELD.width}
                    height={FIELD.height}
                    fill={slide.background}
                    vectorEffect="non-scaling-stroke"
                    shapeRendering="crispEdges"
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