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
    fontSize: 16,
    fontFamily: "Verdana",
    position: { x: 10, y: 20 },
    size: { width: 100, height: 50 },
};

const maxImageElement: ImageElement = {
    id: "image1",
    type: "image",
    src: "https://example.com/image.jpg",
    position: { x: 30, y: 40 },
    size: { width: 200, height: 100 },
};

const maxSlide: Slide = {
    id: "slide1",
    background: "#FFFFFF",
    elements: [maxTextElement, maxImageElement],
};

export const presentation: Presentation = {
    id: '0',
    author: 'Sergey',
    localSlideId: '0',
    slides: [
        maxSlide,
        {...maxSlide, id: '2'}
    ],
    title: 'My Presentation123'
}