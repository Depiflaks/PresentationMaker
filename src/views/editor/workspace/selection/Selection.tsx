import { Slide } from "~/store/types/slide/Slide";

type Props = {
    slide: Slide;
};

export default function Selection({ slide }: Props) {
    const main = slide.selection.area;
    const selectedElements = slide.selection.elements;
    const elements = slide.view.elements;
    return (
        <>
            <rect
                x={main.x}
                y={main.y}
                width={main.width}
                height={main.height}
                fill={"#fce181"}
                fillOpacity={"0.5"}
                stroke="#d38e10"
                strokeWidth={2}
                shapeRendering="crispEdges"
            />
            {selectedElements.map((id: string) => {
                <rect
                    x={elements[id].x}
                    y={elements[id].y}
                    width={elements[id].width}
                    height={elements[id].height}
                    fill={"none"}
                    stroke="#FFE135"
                    shapeRendering="crispEdges"
                />;
            })}
        </>
    );
}
