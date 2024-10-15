import "./SlideSeparator.css"
import move from "../../../assets/SlideList/Separator/move.svg"

type Props = {
    slideId: string;
    onSeparatorClick: () => void;
    isSelected: boolean
};

export default function SlideSeparator({slideId, onSeparatorClick, isSelected}: Props) {

    return (
        <div className="slide-separator-container"
            onClick={onSeparatorClick}
        >
            <div
                className={`slide-separator ${isSelected ? 'selected-separator' : ''} ${isSelected ? 'entered-separator' : ''}`}
            >
                {isSelected && (
                    <img src={move} alt="Move Icon" />
                )}
            </div>
        </div>
    );
}