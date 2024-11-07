import { Presentation } from "~/store/Types/types";
import "./SlideList.css";
import SlidePreview from "./SlidePreview/SlidePreview";
import add from "~/views/assets/SlideList/add.svg"
import { changeCurrent, moveSlide, removeSlide } from "~/store/Methods/Presentation/Presentation";
import SlideSeparator from "./SlideSeparator/SlideSeparator";
import { useState } from "react";
import { dispatch } from "~/store/editor";

type Props = {
    editor: Presentation
}

const endSlide = "endSlide"

export default function SlideList({editor}: Props) {
    const {order, current, slides} = editor;

    const [activeSeparator, setActiveSeparator] = useState<string>(endSlide);
    const [dragEnterId, setDragEnterId] = useState<string>('');

    const slideArray = order.map((id) => slides[id]);

    const onSlideClick = (id: string): void => {
        dispatch(changeCurrent, id);
    }

    const onSeparatorClick = (id: string) => {
        setActiveSeparator(id);
    }

    const onDragEnter = (id: string) => {
        setDragEnterId(id);
    }

    const onDrop = () => {
        const newIndex = dragEnterId === endSlide ? order.length : order.indexOf(dragEnterId);
        dispatch(moveSlide, {slideId: current, newIndex: newIndex});
        setDragEnterId("");
    }

    const deleteSlide = (id: string) => {
        dispatch(removeSlide, id);
    }

    return (
        <div className="slide-list"
            onDragOver={(event) => {event.preventDefault()}}
            onDrop={() => {onDrop()}}
            onMouseLeave={() => {
                setDragEnterId("");
            }}
        >
            <h3>Slides</h3>
            <div className="slide-container">
                {slideArray.map((slide, i) => (
                    <div
                        key={i}
                    >
                        <SlideSeparator
                            slideId={slide.id}
                            isSelected={slide.id === activeSeparator}
                            isEntered={slide.id === dragEnterId}
                            onSeparatorClick={() => {onSeparatorClick(slide.id)}}
                            onDragEnter={() => {onDragEnter(slide.id)}}
                        />
                        <SlidePreview 
                            slide={slide} 
                            isSelected={current === slide.id} 
                            onSlideClick={() => onSlideClick(slide.id)}
                            onDragEnter={() => {onDragEnter(slide.id)}}
                            onDelete={() => {deleteSlide(slide.id)}}
                        />
                    </div>
                ))}
                <SlideSeparator
                    key={endSlide}
                    slideId={endSlide}
                    isSelected={endSlide === activeSeparator}
                    isEntered={endSlide === dragEnterId}
                    onSeparatorClick={() => {onSeparatorClick(endSlide)}}
                    onDragEnter={() => {onDragEnter(endSlide)}}
                />
                <div className="add-button"
                    onDragEnter={(event) => {
                        event.preventDefault()
                        onDragEnter(endSlide)
                    }}
                    onDragOver={(event) => {event.preventDefault()}}
                    draggable={false}
                >
                    <img src={add} draggable={false}/>
                </div>
            </div>
        </div>
    );
};
