import { Elements, ImageElement, Presentation, Slide, TextElement } from "../Types/types";

export function updatePresentationTitle(
    presentation: Presentation,
    newTitle: string,
): Presentation {
    return { ...presentation, title: newTitle };
}

export function createSlide(
    id: string,
    background: string,
    elements: Elements,
): Slide {
    return {id, background, elements};
}

export function addSlide(
    presentation: Presentation,
    newSlide: Slide,
): Presentation {
    return { ...presentation, slides: [...presentation.slides, newSlide] };
}

export function removeSlide(
    presentation: Presentation,
    slideId: string,
): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.filter((slide) => slide.id !== slideId),
    };
}

export function moveSlide(
    presentation: Presentation,
    slideId: string,
    newIndex: number,
): Presentation {
    const slideIndex = presentation.slides.findIndex(
        (slide) => slide.id === slideId,
    );
    if (
        slideIndex === -1 ||
        newIndex < 0 ||
        newIndex >= presentation.slides.length
    ) {
        return presentation;                                                                                                                                                                                                                                                                                                            
    }

    const slides = [...presentation.slides];
    const [movedSlide] = slides.splice(slideIndex, 1);
    slides.splice(newIndex, 0, movedSlide);

    return { ...presentation, slides };
}

export function addSelection(
    slide: Slide,
    element: TextElement | ImageElement,
): Slide {
    return { ...slide, elements: [...slide.elements, element] };
}

export function removeSelection(slide: Slide, elementId: string): Slide {
    return {
        ...slide,
        elements: slide.elements.filter((el) => el.id !== elementId),
    };
}

export function updateElementPosition(
    slide: Slide,
    elementId: string,
    newPosition: { x: number; y: number },
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((el) =>
            el.id === elementId ? { ...el, position: newPosition } : el,
        ),
    };
}

export function updateElementSize(
    slide: Slide,
    elementId: string,
    newSize: { width: number; height: number },
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((el) =>
            el.id === elementId ? { ...el, size: newSize } : el,
        ),
    };
}

export function updateTextContent(
    slide: Slide,
    textId: string,
    newText: string,
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((el) =>
            el.id === textId && el.type === "text"
                ? { ...el, content: newText }
                : el,
        ),
    };
}

export function updateTextFontSize(
    slide: Slide,
    textId: string,
    newFontSize: number,
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((el) =>
            el.id === textId && el.type === "text"
                ? { ...el, fontSize: newFontSize }
                : el,
        ),
    };
}

export function updateTextFontFamily(
    slide: Slide,
    textId: string,
    newFontFamily: string,
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((el) =>
            el.id === textId && el.type === "text"
                ? { ...el, fontFamily: newFontFamily }
                : el,
        ),
    };
}

export function updateSlideBackground(
    slide: Slide,
    newBackground: string,
): Slide {
    return { ...slide, background: newBackground };
}
