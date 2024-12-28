import { Elements, ImageElement, TextElement } from "~/store/types/Presentation";
import ImageComponent from "~/components/ImageComponent";
import TextComponent from "~/components/TextComponent";
import "./SlideThumbnail.css";

type Props = {
    elements: Elements;
    onClick: () => void;
};

export default function SlideThumbnail({ elements, onClick }: Props) {
    return (
        <div className="slide-thumbnail" onClick={() => {onClick()}}>
            <svg
                className="thumbnail-svg"
                viewBox="0 0 1600 900"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.values(elements).map((element, i) => {
                    if (element.type === 'text') {
                        return <TextComponent key={i} element={element as TextElement} relative={{ x: 0, y: 0 }} scale={1} />;
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={i} element={element as ImageElement} relative={{ x: 0, y: 0 }} scale={1} />;
                    }
                })}
            </svg>
        </div>
    );
}
