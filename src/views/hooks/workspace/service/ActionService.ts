import { ActionCreatorsMapObject } from "redux";
import { DELTA_SCALE } from "~/store/const/CONST";
import { Position } from "~/store/types/Global";
import { Slide } from "~/store/types/slide/Slide";

type ZoomOperationInput = {
    slide: Slide;
    mouse: Position;
    deltaScale: number;
}

type EditorServiceInput = {
    actions: ActionCreatorsMapObject;
};

export class ActionService {
    private actions: ActionCreatorsMapObject;

    constructor({actions}: EditorServiceInput) {
        this.actions = actions;
    }

    zoom({mouse, slide, deltaScale}: ZoomOperationInput): void {
        const { changeScale } = this.actions;

        const newScale = Math.max(
            slide.view.scale + DELTA_SCALE * deltaScale,
            0.1,
        );
        const newCursor: Position = {
            x: mouse.x / slide.view.scale * newScale,
            y: mouse.y / slide.view.scale * newScale
        }
        const newRelative: Position = {
            x: slide.view.relative.x / slide.view.scale * newScale,
            y: slide.view.relative.y / slide.view.scale * newScale,
        }
        const cursorDelta: Position = {
            x: newCursor.x - mouse.x,
            y: newCursor.y - mouse.y
        }
        const relativeDelta: Position = {
            x: newRelative.x - slide.view.relative.x,
            y: newRelative.y - slide.view.relative.y
        }
        changeScale({ slideId: slide.id, newScale: newScale });
        this.moveCanvas(slide, {x: cursorDelta.x - relativeDelta.x, y: cursorDelta.y - relativeDelta.y});
    }

    moveCanvas(slide: Slide, delta: Position) {
        const relative = slide.view.relative;
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
