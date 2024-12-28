import SlidePreview from "~/views/editor/slideList/slideContainer/slidePreview/SlidePreview";
import add from "~/views/assets/SlideList/add.svg"
import SlideSeparator from "~/views/editor/slideList/slideContainer/slideSeparator/SlideSeparator";
import MaketPanel from "~/views/editor/slideList/slideContainer/maketPanel/MaketPanel";
import { createSlide } from "~/store/actions/slide/Slide";
import { useRef, useState } from "react";
import { Presentation } from "~/store/types/Presentation";
import { dispatch } from "~/store/editor";
import { changeCurrentSlide, removeSlide, storeSlide } from "~/store/actions/presentation/Presentation";

type Props = {
    editor: Presentation;
    dragEnterId: string;
    setDragEnterId: (dragId: string) => void;
}

const endSlide = "endSlide";

export default function SlideContainer({editor, dragEnterId, setDragEnterId}: Props) {
    const {order, current, slides} = editor;
    const slideArray = order.map((id) => slides[id]);
    const [activeSeparator, setActiveSeparator] = useState<string>(endSlide);
    const [isMaketPanelVisible, setIsMaketPanelVisible] = useState<boolean>(false);
    const [panelPosition, setPanelPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const addButtonRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const onSlideClick = (id: string): void => {
        dispatch(changeCurrentSlide, id);
    }

    const onSeparatorClick = (id: string) => {
        setActiveSeparator(id);
    }

    const onDragEnter = (id: string) => {
        setDragEnterId(id);
    }

    const deleteSlide = (id: string) => {
        dispatch(removeSlide, id);
    }

    const toggleMaketPanel = () => {
        if (!isMaketPanelVisible && addButtonRef.current) {
            const { top, left, width } = addButtonRef.current.getBoundingClientRect();
            console.log(top);
            setPanelPosition({
                top: Math.min(top, window.innerHeight - 150),
                left: left + window.scrollX + width + 10,
            });
        }
        setIsMaketPanelVisible((prev) => !prev);
    };

    const onMaketSelect = (index: number) => {
        const newSlide = createSlide(index);
        dispatch(storeSlide, newSlide);
        setIsMaketPanelVisible(false);
    };

    return (
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
        <div style={{width: "100%"}}>
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
                onClick={toggleMaketPanel}
                ref={addButtonRef}
            >
                <img src={add} draggable={false}/>
            </div>
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