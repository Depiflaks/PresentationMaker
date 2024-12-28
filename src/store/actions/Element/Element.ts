import { ImageElement, TextElement, Position, Size } from "../../types/Presentation";
import { createId } from "../Generator/Generator";

type Element = TextElement | ImageElement;

type ImageProp = {
    type: "image";
    position: Position;
    size: Size;
    src: string;
}

type TextProp = {
    type: "text";
    position: Position;
    size: Size;
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}

export function createElement(properties: ImageProp | TextProp): Element {
    switch (properties.type) {
        case "text":
            return {...properties, id: createId()}
        case "image":
            return {...properties, id: createId()}
    }
}

export function updatePosition(
    element: Element,
    newPosition: { x: number; y: number },
): Element {
    return {
        ...element,
        position: newPosition,
    };
}

export function updateSize(
    element: Element,
    newSize: { width: number; height: number },
): Element {
    return {
        ...element,
        size: newSize,
    };
}
