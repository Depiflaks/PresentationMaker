import { Elements } from "../../Types/types";
import { caption } from "./components/Caption";
import { testImage } from "./components/TestImage";

const model1: Elements = {
    [caption.id]: caption
}

const model2: Elements = {
    [testImage.id]: testImage
}

export const slidesModels: Elements[] = [
    {},
    model1,
    model2
]

