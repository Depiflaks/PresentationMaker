import { START_POSITION, START_SCALE } from "~/store/const/CONST";
import { slidesModels } from "~/store/data/models/Models";
import { Editor } from "~/store/types/Editor";
import { createId } from "~/utils/uuid";
import { RemoveElementInput, ChangeRelativeInput, ChangeScaleInput, UpdateSlideBackgroundInput, StoreElementInput } from "~/store/input/slide/SlideInputs";
import { Elements, Presentation, Slide, SlideCollection } from "~/store/types/Presentation";

export function createSlide(model: number = 0): Slide {
    return {
        id: createId(),
        background: "white",
        elements: slidesModels[model],
        relative: { ...START_POSITION },
        scale: START_SCALE
    };
}

export function removeElement(editor: Editor, { slideId, elementId }: RemoveElementInput): Editor {
    const slides = editor.presentation.slides;
    const newColl: Elements = { ...slides[slideId].elements };
    delete newColl[elementId];
    slides[slideId].elements = newColl;
    return {
        selection: editor.selection,
        presentation: {
            ...editor.presentation,
            slides: slides
        }
    };
}

export function changeRelative(editor: Editor, { slideId, newRelative }: ChangeRelativeInput): Editor {
    const slides = editor.presentation.slides;
    slides[slideId].relative = { ...newRelative };
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides,
        },
    };
}

export function changeScale(editor: Editor, { slideId, newScale }: ChangeScaleInput): Editor {
    const currentSlide = editor.presentation.slides[slideId];

    const updatedSlide: Slide = {
        ...currentSlide,
        scale: newScale,
    };

    const updatedSlides: SlideCollection = {
        ...editor.presentation.slides,
        [slideId]: updatedSlide,
    };

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slides: updatedSlides,
    };

    return {
        ...editor,
        presentation: updatedPresentation,
    };
}

export function updateSlideBackground(editor: Editor, { slideId, newBackground }: UpdateSlideBackgroundInput): Editor {
    const slides = editor.presentation.slides;
    slides[slideId].background = newBackground;
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides,
        },
    };
}

export function storeElement(editor: Editor, { slideId, element }: StoreElementInput): Editor {
    const slides = editor.presentation.slides;
    slides[slideId].elements = {
        ...slides[slideId].elements,
        [element.id]: element,
    };
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides,
        },
    };
}
