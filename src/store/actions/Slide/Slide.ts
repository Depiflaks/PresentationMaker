import { START_POSITION, START_SCALE } from "~/store/const/CONST";
import { slidesModels } from "~/store/data/models/Models";
import { Elements, ImageElement, Position, Slide, TextElement } from "~/store/types/Presentation";
import { createId } from "~/store/actions/Generator/Generator";

export function createSlide(model: number = 0): Slide {
    return {
        id: createId(),
        background: "white",
        elements: slidesModels[model],
        relative: {...START_POSITION},
        scale: START_SCALE
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

export function changeRelative(slide: Slide, newRelative: Position): Slide {
    return {
        ...slide,
        relative: {...newRelative}
    }
}

export function changeScale(slide: Slide, newScale: number): Slide {
    return {
        ...slide,
        scale: newScale
    }
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
