import { FIELD } from "~/store/const/CONST";
import { Position } from "~/store/types/Global";
import { EditorService } from "./EditorService";

export class CanvasService {
    static getRelative(event: MouseEvent): Position {
        const canvas = CanvasService.getCanvas();
        const slide = EditorService.getSlide();
        const mouse = this.getMousePosition(event);
        const result: Position = {
            x: 0,
            y: 0,
        };
        const measure = FIELD.width / canvas.width;
        const canvasHeight = (canvas.width * FIELD.height) / FIELD.width;
        const deltaHeight = (canvas.height - canvasHeight) / 2;

        result.x = mouse.x * measure * slide.view.scale + slide.view.relative.x;
        result.y =
            (mouse.y - deltaHeight) * measure * slide.view.scale + slide.view.relative.y;
        return result;
    }

    static getMousePosition(event: MouseEvent | WheelEvent): Position {
        const canvas = CanvasService.getCanvas();
        return {
            x: event.clientX - canvas.left,
            y: event.clientY - canvas.top,
        };
    }

    static getCanvas(): DOMRect {
        const element = document.getElementById("workspace");
        if (!element) throw Error("Workspace tag does not exist")
        return element.getBoundingClientRect();
    }
}