import "./SlideList.css";

// Компонент SlideList
export default function SlideList() {
    return (
        <div className="slide-list">
            <h3>Slides</h3>
            {/* Список слайдов */}
            <ul>
                <li>Slide 1</li>
                <li>Slide 2</li>
                <li>Slide 3</li>
            </ul>
        </div>
    );
};