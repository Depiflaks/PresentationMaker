import { createId } from "../../utils/uuid";
import { createSlide } from "../actions/slide/Slide";
import { Editor } from "../types/Editor";
import { ElementType, ImageElement, TextElement } from "../types/slide/element/Element";

const slide = createSlide();

export const defaultEditor: Editor = {
    id: createId(),
    author: 'user',
    current: slide.id,
    order: [slide.id],
    title: 'My Banana Presentation',
    slides: {
        [slide.id]: slide
    },
    shouldSave: true,
}

export const defaultTextElement: TextElement = {
    id: createId(),
    type: ElementType.TEXT,
    color: "#333",
    content: "Your text",
    fontSize: 20,
    fontFamily: "Arial",
    zIndex: 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

export const defaultImageElement: ImageElement = {
    id: createId(),
    type: ElementType.IMAGE,
    href: "",
    aspectRatio: true,
    zIndex: 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0
}