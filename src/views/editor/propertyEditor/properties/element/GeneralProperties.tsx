import { Slide } from "~/store/types/slide/Slide";
import DoubleInput, { Pair } from "../components/DoubleInput";
import SingleInput from "../components/SingleInput";
import { EditorService } from "~/views/hooks/workspace/service/EditorService";
import { Position, Size } from "~/store/types/Global";
import { useAppActions } from "~/views/hooks/useAppActions";

type Props = {
    slide: Slide;
};

export default function GeneralProperties({ slide }: Props) {
    const { updateElementRect, updateElementZIndex } = useAppActions();
    const area = EditorService.roundRect(slide.selection.area);
    const updatePosition = (newPoint: Position) => {
        const area = slide.selection.area;
        const scaleElements = EditorService.scaleSelectedElements({
            ...area,
            ...newPoint,
        });
        updateElementRect({
            rectMap: scaleElements,
        });
    };
    const updateSize = (newSize: Size) => {
        const area = slide.selection.area;
        const scaleElements = EditorService.scaleSelectedElements({
            ...area,
            ...newSize,
        });
        updateElementRect({
            rectMap: scaleElements,
        });
    };
    const updateZIndex = (elementId: string, newZIndex: number) => {
        updateElementZIndex({
            elementId: elementId,
            newZIndex: newZIndex,
        });
    };
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
                onBlur={(value: string) => {
                    updateZIndex(elementId, Number(value));
                }}
            />
        );
    };
    return (
        <>
            <DoubleInput
                caption="Position"
                items={{ first: "X", second: "Y" }}
                value={{ first: area.x, second: area.y }}
                onChange={(value: Pair<number>) => {updatePosition({x: value.first, y: value.second})}}
            />
            <DoubleInput
                caption="Size"
                items={{ first: "Width", second: "Height" }}
                value={{ first: area.width, second: area.height }}
                onChange={(value: Pair<number>) => {updateSize({width: value.first, height: value.second})}}
            />
            {zIndexElement()}
        </>
    );
}
