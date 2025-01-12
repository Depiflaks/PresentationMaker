import { TextElement } from "~/store/types/slide/element/Element";
import Color from "../../components/Color";
import SingleInput from "../../components/SingleInput";
import TextArea from "../../components/TextArea";
import { useAppActions } from "~/views/hooks/useAppActions";

type Props = {
    element: TextElement;
}

export default function TextProperties({ element }: Props ) {
    const { updateTextElement } = useAppActions();

    const updateFontSize = (value: string) => {
        updateTextElement({
            elementId: element.id,
            parameters: {
                fontSize: Number(value),
            }
        });
    }

    const updateFontFamily = (value: string) => {
        updateTextElement({
            elementId: element.id,
            parameters: {
                fontFamily: value,
            }
        });
    }

    const updateContent = (value: string) => {
        updateTextElement({
            elementId: element.id,
            parameters: {
                content: value,
            }
        });
    }

    const updateColor = (value: string) => {
        updateTextElement({
            elementId: element.id,
            parameters: {
                color: value,
            }
        });
    }
    return (
        <>
            <SingleInput
                caption="Font Size"
                type="number"
                value={String(Math.round(element.fontSize))}
                onBlur={updateFontSize}
            />
            <SingleInput
                caption="Font Family"
                type="text"
                value={element.fontFamily}
                onBlur={updateFontFamily}
            />
            <TextArea
                content="Content"
                onChange={updateContent}
                value={element.content}
            />
            <Color caption="Font Color" color={element.color} onChange={updateColor} />
        </>
    );
}
