import { RESIZE_POINT_RADIUS } from "~/store/const/CONST";
import { AreaType, Slide } from "~/store/types/slide/Slide";

type Props = {
    slide: Slide;
};

export default function Selection({ slide }: Props) {
    const areaType = slide.selection.areaType;
    const area = slide.selection.area;
    const selectedElements = slide.selection.elements;
    const elements = slide.view.elements;

    const resizeHandles = [
        { x: area.x, y: area.y, cursor: "nw-resize" }, // top-left
        { x: area.x + area.width / 2, y: area.y, cursor: "n-resize" }, // top-center
        { x: area.x + area.width, y: area.y, cursor: "ne-resize" }, // top-right
        { x: area.x, y: area.y + area.height / 2, cursor: "w-resize" }, // middle-left
        {
            x: area.x + area.width,
            y: area.y + area.height / 2,
            cursor: "e-resize",
        }, // middle-right
        { x: area.x, y: area.y + area.height, cursor: "sw-resize" }, // bottom-left
        {
            x: area.x + area.width / 2,
            y: area.y + area.height,
            cursor: "s-resize",
        }, // bottom-center
        {
            x: area.x + area.width,
            y: area.y + area.height,
            cursor: "se-resize",
        }, // bottom-right
    ];

    return (
        <>
            <rect
                x={area.x}
                y={area.y}
                width={area.width}
                height={area.height}
                fill={areaType}
                fillOpacity={areaType === AreaType.NONE_FILL ? 0 : 0.5}
                stroke="#d38e10"
                strokeWidth={2}
                shapeRendering="crispEdges"
            />
            {selectedElements.map((id: string, i) => (
                <rect
                    key={i}
                    x={elements[id].x}
                    y={elements[id].y}
                    width={elements[id].width}
                    height={elements[id].height}
                    fill="none"
                    stroke="#d38e10"
                    strokeWidth={2}
                    strokeDasharray="5,5"
                    shapeRendering="crispEdges"
                />
            ))}
            {area.width > 0 &&
                area.height > 0 &&
                areaType === AreaType.NONE_FILL &&
                resizeHandles.map((handle, index) => (
                    <circle
                        key={index}
                        cx={handle.x}
                        cy={handle.y}
                        r={RESIZE_POINT_RADIUS}
                        fill="#d38e10"
                        stroke="none"
                        style={{ cursor: handle.cursor }}
                    />
                ))}
        </>
    );
}
