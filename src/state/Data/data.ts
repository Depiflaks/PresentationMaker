import { ImageElement, Presentation, Slide, TextElement} from "../Types/types";

const slide1: Slide = {
    background: 'white',
    elements: [],
    id: '3',
}

const slide2: Slide = {
    background: 'white',
    elements: [],
    id: '4',
}

const maxTextElement: TextElement = {
    id: "text1",
    type: "text",
    content: "Hello world!",
    fontSize: 50,
    color: "black",
    fontFamily: "Verdana",
    position: { x: 300, y: 100 },
    size: { width: 150, height: 50 },
};

const maxImageElement: ImageElement = {
    id: "image1",
    type: "image",
    src: "./image.png",
    position: { x: 250, y: 150 },
    size: { width: 1000, height: 500 },
};

const maxSlide: Slide = {
    id: "1",
    background: "#FFFFFF",
    elements: [maxTextElement, maxImageElement],
};

const emptySlide: Slide = {
    id: '2',
    background: "#fff",
    elements: []
}

export const presentation: Presentation = {
    id: '0',
    author: 'Sergey',
    localSlideId: '0',
    slides: [
        maxSlide,
        emptySlide
    ],
    title: 'My Presentation'
}