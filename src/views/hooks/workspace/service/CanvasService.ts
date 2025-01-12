import { FIELD } from "~/store/const/CONST";
import { Position } from "~/store/types/Global";
import { EditorService } from "./EditorService";

export class CanvasService {
    private canvas: DOMRect;

    constructor(canvas: DOMRect) {
        this.canvas = canvas;
    }

    getRelative(event: MouseEvent): Position {
        const slide = EditorService.getSlide();
        const mouse = this.getMousePosition(event);
        const result: Position = {
            x: 0,
            y: 0,
        };
        const measure = FIELD.width / this.canvas.width;
        const canvasHeight = (this.canvas.width * FIELD.height) / FIELD.width;
        const deltaHeight = (this.canvas.height - canvasHeight) / 2;

        result.x = mouse.x * measure * slide.view.scale + slide.view.relative.x;
        result.y =
            (mouse.y - deltaHeight) * measure * slide.view.scale + slide.view.relative.y;
        return result;
    }

    getMousePosition(event: MouseEvent | WheelEvent): Position {
        return {
            x: event.clientX - this.canvas.left,
            y: event.clientY - this.canvas.top,
        };
    }
}