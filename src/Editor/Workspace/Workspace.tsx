import { ImageElement, Slide, SlideCollection, TextElement } from "../../state/Types/types";
import ImageComponent from "../components/ImageComponent";
import TextComponent from "../components/TextComponent";
import "./Workspace.css";

type Props = {
    slide: Slide
}

export default function Workspace({slide}: Props) {
    return (
        <>
        <div className="workspace">
            <div className="canvas">
                <svg className="canvas-svg" viewBox="0 0 1600 900">
                    {slide.elements.map((element, i) => {
                        if (element.type === 'text') {
                            return <TextComponent key={i} element={element as TextElement} />
                        }
                        if (element.type === 'image') {
                            return <ImageComponent key={i} element={element as ImageElement} />
                        }
                    })}
                </svg>
            </div>
        </div>
        </>
    );
};