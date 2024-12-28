import { createId } from "../../../actions/Generator/Generator";
import { ImageElement } from "../../../types/Presentation";

export const testImage: ImageElement = {
    id: createId(),
    type: "image",
    src: "./image.png",
    position: { x: 400, y: 150 },
    size: { width: 1000, height: 500 },
};