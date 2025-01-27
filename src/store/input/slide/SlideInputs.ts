import { Position, Rect } from "~/store/types/Global";
import { TextElement, ImageElement } from "~/store/types/slide/element/Element";
import { AreaType } from "~/store/types/slide/Slide";

export type RemoveElementsInput = {
    slideId: string;
    elementIds: string[];
};

export type ChangeRelativeInput = {
    slideId: string;
    newRelative: Position;
};

export type ChangeScaleInput = {
    slideId: string;
    newScale: number;
};

export type UpdateSlideBackgroundInput = {
    slideId: string;
    newBackground: string;
};

export type StoreElementInput = {
    slideId: string;
    element: TextElement | ImageElement;
};

export type SetSelectionAreaInput = {
    slideId: string;
    newArea: Rect;
}

export type SetSelectionAreaTypeInput = {
    slideId: string;
    areaType: AreaType;
}

export type SetSelectedListInput = {
    slideId: string;
    newIds: string[];
}

export type AppendToSelectedListInput = {
    slideId: string;
    itemId: string;
}

export type DeleteFromSelectedListInput = {
    slideId: string;
    itemId: string;
}
