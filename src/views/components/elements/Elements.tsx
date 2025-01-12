import TextComponent from "../TextComponent";
import ImageComponent from "../ImageComponent";
import {
    Element,
    ElementType,
    ImageElement,
    TextElement,
} from "~/store/types/slide/element/Element";

type Props = {
    elements: Element[];
};

export default function Elements({ elements }: Props) {
    return (
        <>
            {elements.map((element: Element) => {
                if (element.type === ElementType.TEXT) {
                    return (
                        <TextComponent
                            key={element.id}
                            element={element as TextElement}
                        />
                    );
                }
                if (element.type === ElementType.IMAGE) {
                    return (
                        <ImageComponent
                            key={element.id}
                            element={element as ImageElement}
                        />
                    );
                }
            })}
        </>
    );
}
