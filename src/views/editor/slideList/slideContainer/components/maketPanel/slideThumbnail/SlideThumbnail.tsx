import { Elements, ImageElement, TextElement } from "~/store/types/Presentation";
import ImageComponent from "~/views/components/ImageComponent";
import TextComponent from "~/views/components/TextComponent";
import styles from "./SlideThumbnail.module.css";

type Props = {
    elements: Elements;
    onClick: () => void;
};

export default function SlideThumbnail({ elements, onClick }: Props) {
    return (
        <div className={styles.thumbnail} onClick={() => {onClick()}}>
            <svg
                className={styles.svg}
                viewBox="0 0 1600 900"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.values(elements).map((element, i) => {
                    if (element.type === 'text') {
                        return <TextComponent key={i} element={element as TextElement} />;
                    }
                    if (element.type === 'image') {
                        return <ImageComponent key={i} element={element as ImageElement} />;
                    }
                })}
            </svg>
        </div>
    );
}
