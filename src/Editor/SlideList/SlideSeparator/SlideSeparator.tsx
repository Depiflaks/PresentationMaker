import "./SlideSeparator.css"

type Props = {
    slideId: string;
    onSeparatorClick: () => void;
    isSelected: boolean
};

export default function SlideSeparator({slideId, onSeparatorClick, isSelected}: Props) {

    return (
            <div
                className={`slide-separator ${isSelected && 'selected-separator'}`}
                onClick={onSeparatorClick}
            />
    );
}