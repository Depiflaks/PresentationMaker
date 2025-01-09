import { useEffect, useRef } from "react";

import TextComponent from "~/views/components/TextComponent";
import ImageComponent from "~/views/components/ImageComponent";
import { FIELD } from "~/store/const/CONST";
import { ImageElement, TextElement, ToolType } from "~/store/types/Presentation";

import { useAppSelector } from "~/views/hooks/useAppSelector";

import styles from "~/views/editor/workspace/Workspace.module.css";
import { useMouseEvents } from "~/views/hooks/workspace/useMouseEvents";
import { Editor } from "~/store/types/Editor";

type Props = {
    tool: ToolType;
}

export default function Workspace({ tool }: Props) {
    const editor = useAppSelector((editor => editor));
    const presentation = editor.presentation;
    const canvasRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Editor>(editor);

    useEffect(() => {
        editorRef.current = editor
    }, [editor]);

    if (presentation.current === "") return (
        <div className="workspace"></div>
    );
    
    useMouseEvents({workspaceRef: canvasRef, tool, editorRef});

    const slide = presentation.slides[presentation.current];

    const elements = Object.values(slide.elements);
    const roundedScale = Math.round(slide.scale * 100) / 100;
    return (
        <div className={styles.workspace} ref={canvasRef}>
            <svg 
                className={styles.svg} 
                viewBox={`${Math.round(slide.relative.x)} ${Math.round(slide.relative.y)} ${Math.round(FIELD.width * roundedScale)} ${Math.round(FIELD.height * roundedScale)}`}
            >
                <rect
                    x={ 0 }
                    y={ 0 }
                    width={FIELD.width}
                    height={FIELD.height}
                    fill={slide.background}
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