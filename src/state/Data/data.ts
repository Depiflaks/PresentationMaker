import { ImageElement, Presentation, Slide, TextElement} from "../Types/types";

const maxTextElement: TextElement = {
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
    position: { x: 250, y: 150 },
    size: { width: 1000, height: 500 },
};

const maxSlide: Slide = {
    id: 0,
    background: "#FFFFFF",
    elements: [maxTextElement, maxImageElement],
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
        emptySlide
    ],
    title: 'My Presentation'
}