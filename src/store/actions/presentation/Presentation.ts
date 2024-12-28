import { ChangeCurrentSlideInput, MoveSlideInput, RemoveSlideInput, StoreSlideInput, UpdatePresentationTitleInput } from "~/store/input/presentation/PresentationInputs";
import { Editor } from "~/store/types/Editor";

export function updatePresentationTitle(editor: Editor, { newTitle }: UpdatePresentationTitleInput): Editor {
    const presentation = { ...editor.presentation, title: newTitle };
    return { ...editor, presentation };
}

export function changeCurrentSlide(editor: Editor, { newSlideId }: ChangeCurrentSlideInput): Editor {
    const presentation = { ...editor.presentation, current: newSlideId };
    return { ...editor, presentation };
}

export function storeSlide(editor: Editor, { slide }: StoreSlideInput): Editor {
    const slides = { ...editor.presentation.slides, [slide.id]: slide };
    const order = slide.id in editor.presentation.slides
        ? editor.presentation.order
        : [...editor.presentation.order, slide.id];

    const presentation = { ...editor.presentation, slides, order };
    return { ...editor, presentation };
}

export function removeSlide(editor: Editor, { slideId }: RemoveSlideInput): Editor {
    const slides = { ...editor.presentation.slides };
    delete slides[slideId];

    const order = [...editor.presentation.order];
    const slideInd = order.indexOf(slideId);
    if (slideInd >= 0) order.splice(slideInd, 1);

    const current = order.length !== 0
        ? order[slideInd - (slideInd === order.length ? 1 : 0)]
        : "";

    const presentation = { ...editor.presentation, slides, order, current };
    return { ...editor, presentation };
}

export function moveSlide(editor: Editor, { slideId, newIndex }: MoveSlideInput): Editor {
    const slideIndex = editor.presentation.order.findIndex((id) => id === slideId);
    if (slideIndex === -1 || newIndex < 0 || newIndex > editor.presentation.order.length) {
        return editor;
    }

    const order = [...editor.presentation.order];
    const [movedSlide] = order.splice(slideIndex, 1);
    order.splice(newIndex - (slideIndex < newIndex ? 1 : 0), 0, movedSlide);

    const presentation = { ...editor.presentation, order };
    return { ...editor, presentation };
}
