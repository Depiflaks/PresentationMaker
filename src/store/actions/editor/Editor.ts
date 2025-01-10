import {
    ChangeCurrentSlideInput,
    MoveSlideInput,
    RemoveSlideInput,
    StoreSlideInput,
    UpdatePresentationTitleInput,
} from "~/store/input/presentation/PresentationInputs";
import { Editor } from "~/store/types/Editor";

export function updatePresentationTitle(
    editor: Editor,
    { newTitle }: UpdatePresentationTitleInput,
): Editor {
    return { ...editor, title: newTitle };
}

export function changeCurrentSlide(
    editor: Editor,
    { newSlideId }: ChangeCurrentSlideInput,
): Editor {
    return { ...editor, current: newSlideId };
}

export function storeSlide(editor: Editor, { slide }: StoreSlideInput): Editor {
    const slides = { ...editor.slides, [slide.id]: slide };
    const order =
        slide.id in editor.slides ? editor.order : [...editor.order, slide.id];

    return { ...editor, slides, order };
}

export function removeSlide(
    editor: Editor,
    { slideId }: RemoveSlideInput,
): Editor {
    const slides = { ...editor.slides };
    delete slides[slideId];

    const order = [...editor.order];
    const slideInd = order.indexOf(slideId);
    if (slideInd >= 0) order.splice(slideInd, 1);

    const current =
        order.length !== 0
            ? order[slideInd - (slideInd === order.length ? 1 : 0)]
            : "";

    return { ...editor, slides, order, current };
}

export function moveSlide(
    editor: Editor,
    { slideId, newIndex }: MoveSlideInput,
): Editor {
    const slideIndex = editor.order.findIndex((id) => id === slideId);
    if (slideIndex === -1 || newIndex < 0 || newIndex > editor.order.length) {
        return editor;
    }

    const order = [...editor.order];
    const [movedSlide] = order.splice(slideIndex, 1);
    order.splice(newIndex - (slideIndex < newIndex ? 1 : 0), 0, movedSlide);

    return { ...editor, order };
}
