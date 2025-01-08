import { ActionCreatorsMapObject } from "redux";
import { FIELD, DELTA_SCALE } from "~/store/const/CONST";
import { Editor } from "~/store/types/Editor";

export class MouseEventsHandler {
    private editor: React.RefObject<Editor>;
    private actions: ActionCreatorsMapObject;

    constructor(editor: React.RefObject<Editor>, actions: ActionCreatorsMapObject) {
        this.editor = editor;
        this.actions = actions;
    }

    handleMouseWheel(event: WheelEvent): void {
        if (!this.editor.current) return;
        const presentation = this.editor.current.presentation;
        const slide = presentation.slides[presentation.current];
        const { changeScale, changeRelative } = this.actions;
        const rect = (
            event.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
    
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        const userX =
            slide.relative.x + (mouseX * (FIELD.width * slide.scale)) / rect.width;
        const userY =
            slide.relative.y +
            (mouseY * (FIELD.height * slide.scale)) / rect.height;
    
        const newScale = Math.max(
            slide.scale + DELTA_SCALE * (event.deltaY > 0 ? 1 : -1),
            0.1,
        );
    
        const newRelativeX =
            userX - (mouseX * (FIELD.width * newScale)) / rect.width;
        const newRelativeY =
            userY - (mouseY * (FIELD.height * newScale)) / rect.height;
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