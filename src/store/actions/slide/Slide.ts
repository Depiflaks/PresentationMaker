import { START_POSITION, START_SCALE } from "~/store/const/CONST";
import { slidesModels } from "~/store/data/models/Models";
import { Editor } from "~/store/types/Editor";
import { Elements, ImageElement, Position, Slide, TextElement } from "~/store/types/Presentation";
import { createId } from "~/utils/uuid";

export function createSlide(model: number = 0): Slide {
    return {
        id: createId(),
        background: "white",
        elements: slidesModels[model],
        relative: {...START_POSITION},
        scale: START_SCALE
    };
}

type RemoveElementInput = {
    slideId: string;
    elementId: string;
};

export function removeElement(editor: Editor, {slideId, elementId}: RemoveElementInput): Editor {
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

export type ChangeRelativeInput = {
    slideId: string;
    newRelative: Position;
};

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

export type ChangeScaleInput = {
    slideId: string;
    newScale: number;
};

export function changeScale(editor: Editor, { slideId, newScale }: ChangeScaleInput): Editor {
    const slides = editor.presentation.slides;
    slides[slideId].scale = newScale;
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides,
        },
    };
}

export type UpdateSlideBackgroundInput = {
    slideId: string;
    newBackground: string;
};

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

export type StoreElementInput = {
    slideId: string;
    element: TextElement | ImageElement;
};

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
