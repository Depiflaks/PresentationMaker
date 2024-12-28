import * as PresentationCreators from "./presentation/PresentationCreator";
import * as SlideCreators from "./slide/SlideCreator";
import * as ElementCreators from "./element/ElementCreator";
import * as TextElementCreators from "./element/text/TextElementCreator";

export default {
    ...PresentationCreators,
    ...SlideCreators,
    ...ElementCreators,
    ...TextElementCreators
}