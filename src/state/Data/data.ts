import { Elements, ImageElement, Presentation, Slide, SlideCollection, TextElement} from "../Types/types";

const caption1: TextElement = {
    id: 0,
    type: "text",
    content: "Hello world!",
    fontSize: 50,
    color: "black",
    fontFamily: "Verdana",
    position: { x: 300, y: 100 },
    size: { width: 150, height: 50 },
};

const maxImageElement: ImageElement = {
    id: 1,
    type: "image",
    src: "./image.png",
    position: { x: 400, y: 150 },
    size: { width: 1000, height: 500 },
};

const maxSlide: Slide = {
    id: 2,
    background: "#FFFFFF",
    elements: [caption1, maxImageElement],
};

const emptySlide: Slide = {
    id: 0,
    background: "#fff",
    elements: []
}

export const minPresentation: Presentation = {
    id: 0,
    author: 's.smirnov',
    localSlideId: 0,
    slides: [
        maxSlide,
        emptySlide,
        maxSlide,
    ],
    title: 'My Presentation'
}