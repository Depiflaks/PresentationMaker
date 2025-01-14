import { createId } from "../../utils/uuid";
import { ElementType, ImageElement, TextElement } from "../types/slide/element/Element";

export const defaultTextElement: TextElement = {
    id: createId(),
    type: ElementType.TEXT,
    color: "#333",
    content: "Your text",
    fontSize: 20,
    fontFamily: "Arial",
    zIndex: 2,
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
    zIndex: 2,
    x: 0,
    y: 0,
    width: 0,
    height: 0
}