import { ImageElement } from "~/store/types/Presentation";
import { createId } from "~/utils/uuid";

export const testImage: ImageElement = {
    id: createId(),
    type: "image",
    src: "./image.png",
    position: { x: 0, y: 0 },
    size: { width: 1000, height: 500 },
};