import { Slide } from "~/store/types/slide/Slide";
import DoubleInput from "../components/DoubleInput";
import SingleInput from "../components/SingleInput";
import { EditorService } from "~/views/hooks/workspace/service/EditorService";

type Props = {
    slide: Slide;
};

export default function GeneralProperties({ slide }: Props) {
    const area = EditorService.roundRect(slide.selection.area);
    const zIndexElement = () => {
        const count = slide.selection.elements.length;
        if (count !== 1) return <></>;
        const elementId = slide.selection.elements[0];
        const element = slide.view.elements[elementId];
        return (
            <SingleInput
                caption="Z-Index"
                type="number"
                value={String(element.zIndex)}
                onBlur={() => {}}
            />
        );
    };
    return (
        <>
            <DoubleInput
                caption="Position"
                items={{ first: "X", second: "Y" }}
                value={{ first: area.x, second: area.y }}
                onChange={() => {}}
            />
            <DoubleInput
                caption="Size"
                items={{ first: "Width", second: "Height" }}
                value={{ first: area.width, second: area.height }}
                onChange={() => {}}
            />
            {zIndexElement()}
        </>
    );
}
