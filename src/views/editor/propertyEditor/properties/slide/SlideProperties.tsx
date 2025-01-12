import { Slide } from "~/store/types/slide/Slide";
import Color from "../components/Color";
import { useAppActions } from "~/views/hooks/useAppActions";

type Props = {
    slide: Slide;
}

export default function SlideProperties({ slide }: Props) {
    const { updateSlideBackground } = useAppActions();

    const onChange = (value: string) => {
        updateSlideBackground({
            slideId: slide.id,
            newBackground: value
        });
    }

    return (
        <>
            <Color caption="Background color:" color={slide.view.background} onChange={onChange} />
        </>
    );
}
