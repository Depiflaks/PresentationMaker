import { ElementType } from "~/store/types/slide/element/Element";

export type UpdateTextElementInput = {
    elementId: string;
    parameters: {
        type?: ElementType.TEXT;
        content?: string;
        fontSize?: number;
        fontFamily?: string;
        color?: string;
    };
};
