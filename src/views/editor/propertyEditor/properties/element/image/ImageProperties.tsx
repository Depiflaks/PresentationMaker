import { ImageElement } from "~/store/types/slide/element/Element";
import CheckBox from "../../components/CheckBox";

type Props = {
    element: ImageElement;
}

export default function ImageProperties({ element }: Props) {
    return (
        <>
            <CheckBox
                caption="Aspect Ratio"
                subCaption="Active"
                value={element.aspectRatio}
                onChange={() => {}}
            />
        </>
    );
}
