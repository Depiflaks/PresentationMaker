import {
    EMPTY_SELECTION,
    START_POSITION,
    START_SCALE,
} from "~/store/const/CONST";
import { slidesModels } from "~/store/data/models/Models";
import { Editor, SlideCollection } from "~/store/types/Editor";
import { createId } from "~/utils/uuid";
import {
    RemoveElementInput,
    ChangeRelativeInput,
    ChangeScaleInput,
    UpdateSlideBackgroundInput,
    StoreElementInput,
} from "~/store/input/slide/SlideInputs";
import { Slide, Elements } from "~/store/types/slide/Slide";

export function createSlide(model: number = 0): Slide {
    return {
        id: createId(),
        view: {
            background: "white",
            elements: slidesModels[model],
            relative: { ...START_POSITION },
            scale: START_SCALE,
        },
        selection: EMPTY_SELECTION,
    };
}

export function removeElement(
    editor: Editor,
    { slideId, elementId }: RemoveElementInput,
): Editor {
    const slides = editor.slides;
    const newColl: Elements = { ...slides[slideId].view.elements };
    delete newColl[elementId];
    slides[slideId].view.elements = newColl;
    return {
        ...editor,
        slides: slides,
    };
}

export function changeRelative(
    editor: Editor,
    { slideId, newRelative }: ChangeRelativeInput,
): Editor {
    const slides = editor.slides;
    slides[slideId].view.relative = { ...newRelative };
    return {
        ...editor,
        slides,
    };
}

export function changeScale(
    editor: Editor,
    { slideId, newScale }: ChangeScaleInput,
): Editor {
    const currentSlide = editor.slides[slideId];

    const updatedSlide: Slide = {
        ...currentSlide,
        view: {
            ...currentSlide.view,
            scale: newScale,
        },
    };

    const updatedSlides: SlideCollection = {
        ...editor.slides,
        [slideId]: updatedSlide,
    };

    return {
        ...editor,
        slides: updatedSlides,
    };
}

export function updateSlideBackground(
    editor: Editor,
    { slideId, newBackground }: UpdateSlideBackgroundInput,
): Editor {
    const slide = editor.slides[slideId];
    const newSlide: Slide = {
        ...slide,
        view: {
            ...slide.view,
            background: newBackground,
        },
    };
    return {
        ...editor,
        slides: {
            ...editor.slides,
            [slideId]: newSlide,
        },
    };
}

export function storeElement(
    editor: Editor,
    { slideId, element }: StoreElementInput,
): Editor {
    const slide = editor.slides[slideId];
    const newElements: Elements = {
        ...slide.view.elements,
        [element.id]: element,
    };
    return {
        ...editor,
        slides: {
            ...editor.slides,
            [slideId]: {
                ...slide,
                view: {
                    ...slide.view,
                    elements: newElements,
                },
            },
        },
    };
}
