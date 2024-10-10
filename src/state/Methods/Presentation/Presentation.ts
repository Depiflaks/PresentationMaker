import { Presentation, Slide, SlideCollection } from "../../Types/types";

export function updatePresentationTitle(
    presentation: Presentation,
    newTitle: string,
): Presentation {
    return { ...presentation, title: newTitle };
}


export function addSlide(
    presentation: Presentation,
    newSlide: Slide,
): Presentation {
    return { ...presentation, slides: {...presentation.slides, [newSlide.id]: newSlide} };
}

export function removeSlide(
    presentation: Presentation,
    slideId: string,
): Presentation {
    const newSlides: SlideCollection = {...presentation.slides};
    delete newSlides[slideId]
    // Object.fromEntries(
    //     Object.entries(presentation.slides).filter(([id, _]) => id !== slideId)
    // );
    return {
        ...presentation,
        slides: newSlides,
    };
}

export function moveSlide(
    presentation: Presentation,
    slideId: string,
    newIndex: number,
): Presentation {
    const slideIndex = presentation.order.findIndex(
        (id) => id === slideId,
    );
    if (
        slideIndex === -1 ||
        newIndex < 0 ||
        newIndex >= presentation.order.length
    ) {
        return presentation;                                                                                                                                                                                                                                                                                                            
    }

    const order = [...presentation.order];
    const [movedSlide] = order.splice(slideIndex, 1);
    order.splice(newIndex, 0, movedSlide);

    return { ...presentation, order };
}