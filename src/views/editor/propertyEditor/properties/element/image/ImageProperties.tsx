import { ImageElement } from "~/store/types/slide/element/Element";
import CheckBox from "../../components/CheckBox";
import { useAppActions } from "~/views/hooks/useAppActions";

type Props = {
    element: ImageElement;
}

export default function ImageProperties({ element }: Props) {
    const { updateImageElement } = useAppActions();
    const onChangeAspectRatio = (value: boolean) => {
        updateImageElement({
            elementId: element.id,
            parameters: {
                aspectRatio: value
            }
        });
    }
    return (
        <>
            <CheckBox
                caption="Aspect Ratio"
                subCaption="Active"
                value={element.aspectRatio}
                onChange={(value: boolean) => {onChangeAspectRatio(value)}}
            />
        </>
    );
}
