import { useRef, useState } from "react";

import { createSlide } from "~/store/actions/slide/Slide";
import { useAppActions } from "~/views/hooks/useAppActions";
import { useAppSelector } from "~/views/hooks/useAppSelector";
import MaketPanel from "~/views/editor/slideList/slideContainer/components/maketPanel/MaketPanel";
import SlidePreview from "~/views/editor/slideList/slideContainer/components/slidePreview/SlidePreview";
import SlideSeparator from "~/views/editor/slideList/slideContainer/components/slideSeparator/SlideSeparator";

import styles from "./SlideContainer.module.css"
import { endSlide } from "../const/CONST";
import AddButton from "./components/addButton/AddButton";

type Props = {
    dragEnterId: string;
    setDragEnterId: (dragId: string) => void;
}

export default function SlideContainer({dragEnterId, setDragEnterId}: Props) {
    const {order, current, slides} = useAppSelector((editor => editor));
    const { changeCurrentSlide, removeSlide, storeSlide } = useAppActions();
    
    const slideArray = order.map((id) => slides[id]);
    const [activeSeparator, setActiveSeparator] = useState<string>(endSlide);
    const [isMaketPanelVisible, setIsMaketPanelVisible] = useState<boolean>(false);
    const [panelPosition, setPanelPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const addButtonRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const onSlideClick = (id: string): void => {
        changeCurrentSlide({
            newSlideId: id
        });
    }

    const onSeparatorClick = (id: string) => {
        setActiveSeparator(id);
    }

    const onDragEnter = (id: string) => {
        setDragEnterId(id);
    }

    const deleteSlide = (id: string) => {
        removeSlide({
            slideId: id
        });
    }

    const toggleMaketPanel = () => {
        if (!isMaketPanelVisible && addButtonRef.current) {
            const { top, left, width } = addButtonRef.current.getBoundingClientRect();
            setPanelPosition({
                top: Math.min(top, window.innerHeight - 150),
                left: left + window.scrollX + width + 10,
            });
        }
        setIsMaketPanelVisible((prev) => !prev);
    };

    const onMaketSelect = (index: number) => {
        const newSlide = createSlide(index);
        storeSlide({
            slide: newSlide
        });
        setIsMaketPanelVisible(false);
    };

    return (
    <div className={styles.container}>
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
        <div style={{width: "100%"}}>
            <SlideSeparator
                key={endSlide}
                slideId={endSlide}
                isSelected={endSlide === activeSeparator}
                isEntered={endSlide === dragEnterId}
                onSeparatorClick={() => {onSeparatorClick(endSlide)}}
                onDragEnter={() => {onDragEnter(endSlide)}}
            />
            <AddButton
                buttonRef={addButtonRef}
                onDragEnter={onDragEnter}
                toggleMaketPanel={toggleMaketPanel}
            />
        </div>
        
        {isMaketPanelVisible && <MaketPanel 
            onSelect={onMaketSelect} 
            style={{ top: `${panelPosition.top}px`, left: `${panelPosition.left}px` }} 
            isVisible={isMaketPanelVisible}
            onClose={() => {setIsMaketPanelVisible(false);}}
            panelRef={panelRef}
        />}
    </div>
    )
}