import { createId } from "../../../Methods/Generator/Generator";
import { ImageElement } from "../../../Types/types";

export const testImage: ImageElement = {
    id: createId(),
    type: "image",
    src: "./image.png",
    position: { x: 400, y: 150 },
    size: { width: 1000, height: 500 },
};