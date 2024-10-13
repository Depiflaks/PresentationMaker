import { Presentation } from "../../state/Types/types";
import "./SlideList.css";
import SlidePreview from "./SlidePreview/SlidePreview";
import add from "../../assets/SlideList/add.svg"
import { changeCurrent } from "../../state/Methods/Presentation/Presentation";

type Props = {
    presentation: Presentation,
    setPresentation: (newArg: (prevArg: Presentation) => Presentation) => void
}

export default function SlideList({presentation, setPresentation}: Props) {
    const {order, current, slides} = presentation;

    const slideArray = order.map((id) => slides[id]);

    const slideClickHandler = (id: string): void => {
        setPresentation((prev) => changeCurrent(prev, id));
    }

    return (
        <div className="slide-list">
            <h3>Slides {}</h3>
            <div className="slide-container">
                {slideArray.map((slide, i) => (
                    <SlidePreview 
                        key={i} slide={slide} 
                        isSelected={current === slide.id} 
                        clickHandler={() => slideClickHandler(slide.id)}/>
                ))}
                <div className="add-button">
                    <img src={add}/>
                </div>
            </div>
        </div>
    );
};