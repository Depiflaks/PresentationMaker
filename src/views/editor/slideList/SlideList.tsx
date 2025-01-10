import styles from "./SlideList.module.css";

import { useState } from "react";
import SlideContainer from "~/views/editor/slideList/slideContainer/SlideContainer";
import { useAppSelector } from "~/views/hooks/useAppSelector";
import { useAppActions } from "~/views/hooks/useAppActions";

const endSlide = "endSlide"

export default function SlideList() {
    const {order, current} = useAppSelector((editor => editor));
    const { moveSlide } = useAppActions();

    const [dragEnterId, setDragEnterId] = useState<string>('');
    
    const onDrop = () => {
        const newIndex = dragEnterId === endSlide ? order.length : order.indexOf(dragEnterId);
        moveSlide({
            slideId: current,
            newIndex: newIndex
        });
        setDragEnterId("");
    }

    return (
        <div className={styles.list}
            onDragOver={(event) => {event.preventDefault()}}
            onDrop={() => {onDrop()}}
            onMouseLeave={() => {
                setDragEnterId("");
            }}
        >
            <h3>Slides</h3>
            <SlideContainer
                dragEnterId={dragEnterId}
                setDragEnterId={setDragEnterId}
            />
        </div>
    );
};
