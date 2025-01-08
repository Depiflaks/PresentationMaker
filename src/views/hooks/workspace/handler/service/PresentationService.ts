import { ActionCreatorsMapObject } from "redux";
import { DELTA_SCALE, FIELD } from "~/store/const/CONST";
import { Position, Slide } from "~/store/types/Presentation";

type ZoomOperationInput = {
    slide: Slide;
    mouse: Position;
    deltaScale: number;
}

type PresentationServiceInput = {
    actions: ActionCreatorsMapObject;
    canvas: DOMRect;
};

export class PresentationService {
    private actions: ActionCreatorsMapObject;
    private canvas: DOMRect;

    constructor({actions, canvas}: PresentationServiceInput) {
        this.actions = actions;
        this.canvas = canvas;
    }

    calculateZoomOperation({mouse, slide, deltaScale}: ZoomOperationInput): void {
        const { changeScale, changeRelative } = this.actions;

        const userX =
            slide.relative.x + (mouse.x * (FIELD.width * slide.scale)) / this.canvas.width;
        const userY =
            slide.relative.y +
            (mouse.y * (FIELD.height * slide.scale)) / this.canvas.height;
    
        const newScale = Math.max(
            slide.scale + DELTA_SCALE * deltaScale,
            0.1,
        );
    
        const newRelativeX =
            userX - (mouse.x * (FIELD.width * newScale)) / this.canvas.width;
        const newRelativeY =
            userY - (mouse.y * (FIELD.height * newScale)) / this.canvas.height;
        changeScale({ slideId: slide.id, newScale: newScale });
        changeRelative({
            slideId: slide.id,
            newRelative: {
                x: newRelativeX,
                y: newRelativeY,
            },
        });
    }
}
