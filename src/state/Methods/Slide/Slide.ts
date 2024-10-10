import { slidesModels } from "../../Data/Models/Models";
import { Elements, ImageElement, Slide, TextElement } from "../../Types/types";
import { createId } from "../Generator/Generator";

export function createSlide(model: number = 0): Slide {
    return {
        id: createId(),
        background: "white",
        elements: slidesModels[model],
    };
}

export function removeElement(slide: Slide, elementId: string): Slide {
    const newColl: Elements = { ...slide.elements };
    delete newColl[elementId];
    return {
        ...slide,
        elements: newColl,
    };
}

export function updateSlideBackground(
    slide: Slide,
    newBackground: string,
): Slide {
    return { ...slide, background: newBackground };
}

export function storeElement(
    slide: Slide,
    element: TextElement | ImageElement,
): Slide {
    return {
        ...slide,
        elements: {
            ...slide.elements,
            [element.id]: element,
        },
    };
}
