import TextComponent from "../TextComponent";
import ImageComponent from "../ImageComponent";
import {
    Element,
    ElementType,
    ImageElement,
    TextElement,
} from "~/store/types/slide/element/Element";
import { EditorService } from "~/views/hooks/workspace/service/EditorService";

type Props = {
    elements: Element[];
};

export default function Elements({ elements }: Props) {
    const elementsMap = EditorService.mapElementsByZIndex(elements);
    const zIndexes = Object.keys(elementsMap)
        .sort((a, b) => {
            return Number(a) - Number(b);
        })
        .map((index) => Number(index));
    const getElementComponent = (element: Element) => {
        switch (element.type) {
            case ElementType.TEXT:
                return (
                    <TextComponent
                        key={element.id}
                        element={element as TextElement}
                    />
                );
            case ElementType.IMAGE:
                return (
                    <ImageComponent
                        key={element.id}
                        element={element as ImageElement}
                    />
                );
        }
    };
    return (
        <>
            {zIndexes.map((zIndex, i) => (
                <g key={i}>
                    {Object.values(elementsMap[zIndex]).map((element) => {
                        return getElementComponent(element);
                    })}
                </g>
            ))}{" "}
        </>
    );
}
