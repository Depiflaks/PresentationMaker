import { Rect } from "~/store/types/Global";

export type UpdateImageElementInput = {
    elementId: string;
    parameters: {
        href?: string;
        aspectRatio?: boolean;
    };
};

export interface CreateImageElementInput extends Rect {
    href: string;
};
