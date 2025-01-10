import { Slide } from "~/store/types/slide/Slide";

type Props = {
    slide: Slide;
};

export default function Selection({ slide }: Props) {
    const main = slide.selection.main;
    const selectedElements = slide.selection.elements;
    const elements = slide.view.elements;
    return (
        <>
            <rect
                x={main.start.x}
                y={main.start.y}
                width={main.size.width}
                height={main.size.height}
                fill={"#fce181"}
                fillOpacity={"0.5"}
                stroke="#d38e10"
                strokeWidth={2}
                shapeRendering="crispEdges"
            />
            {selectedElements.map((id: string) => {
                <rect
                    x={elements[id].position.x}
                    y={elements[id].position.y}
                    width={elements[id].size.width}
                    height={elements[id].size.height}
                    fill={"none"}
                    stroke="#FFE135"
                    shapeRendering="crispEdges"
                />;
            })}
        </>
    );
}
