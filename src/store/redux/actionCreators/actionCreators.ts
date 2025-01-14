import * as PresentationCreators from "./editor/EditorCreator";
import * as SlideCreators from "./slide/SlideCreator";
import * as ElementCreators from "./element/ElementCreator";
import * as TextElementCreators from "./element/text/TextElementCreator";
import * as ImageElementCreators from "./element/image/ImageElementCreator";

export default {
    ...PresentationCreators,
    ...SlideCreators,
    ...ElementCreators,
    ...TextElementCreators,
    ...ImageElementCreators
}