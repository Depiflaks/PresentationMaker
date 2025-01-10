import { Position } from "~/store/types/Global";
import { TextElement, ImageElement } from "~/store/types/slide/element/Element";
import { MainSelection } from "~/store/types/slide/Slide";

export type RemoveElementInput = {
    slideId: string;
    elementId: string;
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

export type SetMainSelectionInput = {
    slideId: string;
    newMainSelection: MainSelection;
}

export type SetSelectedListInput = {
    slideId: string;
    newList: string[];
}

export type AppendToSelectedListInput = {
    slideId: string;
    itemId: string;
}

export type DeleteFromSelectedListInput = {
    slideId: string;
    itemId: string;
}
