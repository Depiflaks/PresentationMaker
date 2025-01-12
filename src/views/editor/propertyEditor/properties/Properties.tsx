import styles from "./Properties.module.css";

import { useAppSelector } from "~/views/hooks/useAppSelector";
import SlideProperties from "./slide/SlideProperties";
import GeneralProperties from "./element/GeneralProperties";
import { ElementType } from "~/store/types/slide/element/Element";
import TextProperties from "./element/text/TextProperties";
import ImageProperties from "./element/image/ImageProperties";

export default function Properties() {
    const editor = useAppSelector((editor) => editor);

    if (editor.current === "")
        return (
            <label className={styles.labelText}>
                The list of slides is empty
            </label>
        );

    const slide = editor.slides[editor.current];
    // console.log(slide.id);
    const selectionCount: number = slide.selection.elements.length;
    const uniqueProps = () => {
        if (selectionCount !== 1) return (<></>);
        const elementId = slide.selection.elements[0];
        const element = slide.view.elements[elementId];
        return element.type === ElementType.TEXT ? (<TextProperties element={element}/>) : (<ImageProperties element={element}/>)
    }
    
    return (
        <div className={styles.properties}>
            {selectionCount === 0 && <SlideProperties slide={slide} />}
            {selectionCount > 0 && <GeneralProperties slide={slide} />}
            {uniqueProps()}
        </div>
    );
}
