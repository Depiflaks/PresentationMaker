import { useRef } from "react";

import { FIELD } from "~/store/const/CONST";

import { useAppSelector } from "~/views/hooks/useAppSelector";

import styles from "~/views/editor/workspace/Workspace.module.css";
import { useMouseEvents } from "~/views/hooks/workspace/useMouseEvents";
import { ToolType } from "~/store/types/Global";
import Selection from "../../components/selection/Selection";
import Elements from "~/views/components/elements/Elements";

type Props = {
    tool: ToolType;
};

export default function Workspace({ tool }: Props) {
    const editor = useAppSelector((editor) => editor);

    const canvasRef = useRef<HTMLDivElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useMouseEvents({ workspaceRef: canvasRef, tool, inputRef: imageInputRef });

    if (editor.current === "")
        return <div className={styles.workspace} id="workspace"></div>;

    const slide = editor.slides[editor.current];

    const elements = Object.values(slide.view.elements);
    const roundedScale = Math.round(slide.view.scale * 100) / 100;
    return (
        <div className={styles.workspace} ref={canvasRef} id="workspace">
            <svg
                className={styles.svg}
                viewBox={`${Math.round(slide.view.relative.x)} ${Math.round(slide.view.relative.y)} ${Math.round(FIELD.width * roundedScale)} ${Math.round(FIELD.height * roundedScale)}`}
            >
                <rect
                    x={0}
                    y={0}
                    width={FIELD.width}
                    height={FIELD.height}
                    fill={slide.view.background}
                    shapeRendering="crispEdges"
                />
                <Elements elements={elements} />
                <Selection slide={slide} />
            </svg>
            <input
                ref={imageInputRef}
                type="file"
                style={{ display: "none" }}
            />
        </div>
    );
}
