import { Presentation, Slide, SlideCollection } from "../../types/Presentation";

export function updatePresentationTitle(
    presentation: Presentation,
    newTitle: string,
): Presentation {
    console.log(newTitle);
    return { ...presentation, title: newTitle };
}

export function changeCurrent(
    presentation: Presentation,
    newId: string
) {
    return {
        ...presentation,
        current: newId
    }
}

export function storeSlide(
    presentation: Presentation,
    slide: Slide,
): Presentation {
    return { 
        ...presentation, 
        slides: {
            ...presentation.slides, 
            [slide.id]: slide
        },
        order: 
            slide.id in presentation.slides ? 
            presentation.order : [...presentation.order, slide.id]
    };
}
    
export function removeSlide(
    presentation: Presentation,
    slideId: string,
): Presentation {
    const newSlides: SlideCollection = {...presentation.slides};
    delete newSlides[slideId];
    const order = [...presentation.order];
    const slideInd = order.indexOf(slideId);
    if (slideInd >= 0) order.splice(slideInd, 1);
    const current = (order.length !== 0) ? order[slideInd - (slideInd === order.length ? 1 : 0)] : "";
    return {
        ...presentation,
        order,
        slides: newSlides,
        current: current,
    };
}

export function moveSlide(
    presentation: Presentation,
    {slideId, newIndex}: {
        slideId: string,
        newIndex: number,
    }
): Presentation {
    const slideIndex = presentation.order.findIndex(
        (id) => id === slideId,
    );
    if (
        slideIndex === -1 ||
        newIndex < 0 ||
        newIndex > presentation.order.length
    ) {
        return presentation;                                                                                                                                                                                                                                                                                                            
    }

    const order = [...presentation.order];
    const [movedSlide] = order.splice(slideIndex, 1);
    order.splice(newIndex - (slideIndex < newIndex ? 1 : 0), 0, movedSlide);

    return { ...presentation, order };
}