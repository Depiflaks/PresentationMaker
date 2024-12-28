import { Slide } from "../../types/Presentation";

export type UpdatePresentationTitleInput = {
    newTitle: string;
};

export type ChangeCurrentSlideInput = {
    newSlideId: string;
};

export type StoreSlideInput = {
    slide: Slide;
};

export type RemoveSlideInput = {
    slideId: string;
};

export type MoveSlideInput = {
    slideId: string;
    newIndex: number;
};
