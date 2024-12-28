import { Presentation } from "~/store/types/Presentation";
import "./SlideList.css";

import { moveSlide } from "~/store/actions/presentation/Presentation";

import { useState } from "react";
import { dispatch } from "~/store/editor";
import SlideContainer from "~/views/editor/slideList/slideContainer/SlideContainer";


type Props = {
    editor: Presentation
}

const endSlide = "endSlide"

export default function SlideList({editor}: Props) {
    const {order, current} = editor;
    const [dragEnterId, setDragEnterId] = useState<string>('');
    
    const onDrop = () => {
        const newIndex = dragEnterId === endSlide ? order.length : order.indexOf(dragEnterId);
        dispatch(moveSlide, {slideId: current, newIndex: newIndex});
        setDragEnterId("");
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
            <SlideContainer
                editor={editor}
                dragEnterId={dragEnterId}
                setDragEnterId={setDragEnterId}
            />
        </div>
    );
};
