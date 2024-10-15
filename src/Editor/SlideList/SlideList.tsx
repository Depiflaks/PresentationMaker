import { Presentation } from "../../state/Types/types";
import "./SlideList.css";
import SlidePreview from "./SlidePreview/SlidePreview";
import add from "../../assets/SlideList/add.svg"
import { changeCurrent } from "../../state/Methods/Presentation/Presentation";
import SlideSeparator from "./SlideSeparator/SlideSeparator";
import { useState } from "react";

type Props = {
    presentation: Presentation,
    setPresentation: (newArg: (prevArg: Presentation) => Presentation) => void
}

export default function SlideList({presentation, setPresentation}: Props) {
    const {order, current, slides} = presentation;

    const [activeSeparator, setActiveSeparator] = useState<string>("slide-end");
    const [dragEnterId, setDragEnterId] = useState<string>('');

    const slideArray = order.map((id) => slides[id]);

    const onSlideClick = (id: string): void => {
        setPresentation((prev) => changeCurrent(prev, id));
    }

    const onSeparatorClick = (id: string) => {
        setActiveSeparator(id);
    }

    const onDragEnter = (id: string) => {
        setDragEnterId(id);
    }

    const onDrop = () => {
        setDragEnterId("");
    }

    return (
        <div className="slide-list">
            <h3>Slides {}</h3>
            <div className="slide-container">
                {slideArray.map((slide, i) => (
                    <>
                        <SlideSeparator
                            slideId={slide.id}
                            isSelected={slide.id === activeSeparator}
                            isEntered={slide.id === dragEnterId}
                            onSeparatorClick={() => {onSeparatorClick(slide.id)}}
                            onDragEnter={() => {onDragEnter(slide.id)}}
                            onDrop={() => {onDrop()}}
                        />
                        <SlidePreview 
                            key={i} slide={slide} 
                            isSelected={current === slide.id} 
                            onSlideClick={() => onSlideClick(slide.id)}
                            onDragEnter={() => {onDragEnter(slide.id)}}
                            onDrop={() => {onDrop()}}
                        />
                    </>
                ))}
                <SlideSeparator
                    slideId="slide-end"
                    isSelected={"slide-end" === activeSeparator}
                    isEntered={"slide-end" === dragEnterId}
                    onSeparatorClick={() => {onSeparatorClick("slide-end")}}
                    onDragEnter={() => {onDragEnter("slide-end")}}
                    onDrop={() => {onDrop()}}
                />
                <div className="add-button">
                    <img src={add}/>
                </div>
            </div>
        </div>
    );
};