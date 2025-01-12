import { AreaType, Slide } from "~/store/types/slide/Slide";

type Props = {
    slide: Slide;
};

export default function Selection({ slide }: Props) {
    const areaType = slide.selection.areaType;
    const area = slide.selection.area;
    const selectedElements = slide.selection.elements;
    const elements = slide.view.elements;
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
            {selectedElements.map((id: string, i) => {
                return (<rect
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
                />);
            })}
        </>
    );
}
