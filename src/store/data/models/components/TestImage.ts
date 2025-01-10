import { ElementType, ImageElement } from "~/store/types/slide/element/Element";
import { createId } from "~/utils/uuid";

export const testImage: ImageElement = {
    id: createId(),
    type: ElementType.IMAGE,
    src: "./image.png",
    x: 0,
    y: 0,
    width: 1000,
    height: 500,
    zIndex: 1,
};