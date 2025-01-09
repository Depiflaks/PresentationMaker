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
};

export class PresentationService {
    private actions: ActionCreatorsMapObject;

    constructor({actions}: PresentationServiceInput) {
        this.actions = actions;
    }

    zoom({mouse, slide, deltaScale}: ZoomOperationInput): void {
        const { changeScale } = this.actions;

        const newScale = Math.max(
            slide.scale + DELTA_SCALE * deltaScale,
            0.1,
        );
        const newCursor: Position = {
            x: mouse.x / slide.scale * newScale,
            y: mouse.y / slide.scale * newScale
        }
        const newRelative: Position = {
            x: slide.relative.x / slide.scale * newScale,
            y: slide.relative.y / slide.scale * newScale,
        }
        const cursorDelta: Position = {
            x: newCursor.x - mouse.x,
            y: newCursor.y - mouse.y
        }
        const relativeDelta: Position = {
            x: newRelative.x - slide.relative.x,
            y: newRelative.y - slide.relative.y
        }
        changeScale({ slideId: slide.id, newScale: newScale });
        this.moveCanvas(slide, {x: cursorDelta.x - relativeDelta.x, y: cursorDelta.y - relativeDelta.y});
    }

    moveCanvas(slide: Slide, delta: Position) {
        const relative = slide.relative;
        const { changeRelative } = this.actions;
        
        changeRelative({
            slideId: slide.id,
            newRelative: {
                x: relative.x - delta.x,
                y: relative.y - delta.y
            }
        });
    }
}
