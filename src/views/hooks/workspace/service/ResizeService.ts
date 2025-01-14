import { Position, Circle, Rect } from "~/store/types/Global";
import { ResizeType } from "../handler/type/MouseAction";
import { RESIZE_POINT_RADIUS } from "~/store/const/CONST";
import { EditorService } from "./EditorService";

export class ResizeService {
    static isCursorInsideCircle(cursor: Position, circle: Circle): boolean {
        const dx = cursor.x - circle.x;
        const dy = cursor.y - circle.y;
        const distanceSquared = dx * dx + dy * dy;
        return distanceSquared <= circle.radius * circle.radius;
    }

    static getResizeType(cursor: Position): ResizeType {
        const slide = EditorService.getSlide();
        const rect = slide.selection.area;
        const handles: { position: Position; type: ResizeType }[] = [
            { position: { x: rect.x, y: rect.y }, type: ResizeType.TOP_LEFT },
            {
                position: { x: rect.x + rect.width / 2, y: rect.y },
                type: ResizeType.TOP_CENTER,
            },
            {
                position: { x: rect.x + rect.width, y: rect.y },
                type: ResizeType.TOP_RIGHT,
            },
            {
                position: { x: rect.x, y: rect.y + rect.height / 2 },
                type: ResizeType.MIDDLE_LEFT,
            },
            {
                position: {
                    x: rect.x + rect.width,
                    y: rect.y + rect.height / 2,
                },
                type: ResizeType.MIDDLE_RIGHT,
            },
            {
                position: { x: rect.x, y: rect.y + rect.height },
                type: ResizeType.BOTTOM_LEFT,
            },
            {
                position: {
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height,
                },
                type: ResizeType.BOTTOM_CENTER,
            },
            {
                position: { x: rect.x + rect.width, y: rect.y + rect.height },
                type: ResizeType.BOTTOM_RIGHT,
            },
        ];

        for (const handle of handles) {
            if (
                this.isCursorInsideCircle(cursor, {
                    ...handle.position,
                    radius: RESIZE_POINT_RADIUS,
                })
            ) {
                return handle.type;
            }
        }

        return ResizeType.NONE;
    }

    static resizeSelectionRect(
        newCursorPosition: Position,
        resizeType: ResizeType
    ): Rect {
        const minSize = 10;
        const slide = EditorService.getSlide();
        const previousRect = slide.selection.area;
        let { x, y, width, height } = previousRect;
    
        switch (resizeType) {
            case ResizeType.TOP_LEFT:
                const newWidthTL = width + (x - newCursorPosition.x);
                const newHeightTL = height + (y - newCursorPosition.y);
                if (newWidthTL > minSize) {
                    width = newWidthTL;
                    x = newCursorPosition.x;
                }
                if (newHeightTL > minSize) {
                    height = newHeightTL;
                    y = newCursorPosition.y;
                }
                break;
    
            case ResizeType.TOP_CENTER:
                const newHeightTC = height + (y - newCursorPosition.y);
                if (newHeightTC > minSize) {
                    height = newHeightTC;
                    y = newCursorPosition.y;
                }
                break;
    
            case ResizeType.TOP_RIGHT:
                const newWidthTR = newCursorPosition.x - x;
                const newHeightTR = height + (y - newCursorPosition.y);
                if (newWidthTR > minSize) {
                    width = newWidthTR;
                }
                if (newHeightTR > minSize) {
                    height = newHeightTR;
                    y = newCursorPosition.y;
                }
                break;
    
            case ResizeType.MIDDLE_LEFT:
                const newWidthML = width + (x - newCursorPosition.x);
                if (newWidthML > minSize) {
                    width = newWidthML;
                    x = newCursorPosition.x;
                }
                break;
    
            case ResizeType.MIDDLE_RIGHT:
                const newWidthMR = newCursorPosition.x - x;
                if (newWidthMR > minSize) {
                    width = newWidthMR;
                }
                break;
    
            case ResizeType.BOTTOM_LEFT:
                const newWidthBL = width + (x - newCursorPosition.x);
                const newHeightBL = newCursorPosition.y - y;
                if (newWidthBL > minSize) {
                    width = newWidthBL;
                    x = newCursorPosition.x;
                }
                if (newHeightBL > minSize) {
                    height = newHeightBL;
                }
                break;
    
            case ResizeType.BOTTOM_CENTER:
                const newHeightBC = newCursorPosition.y - y;
                if (newHeightBC > minSize) {
                    height = newHeightBC;
                }
                break;
    
            case ResizeType.BOTTOM_RIGHT:
                const newWidthBR = newCursorPosition.x - x;
                const newHeightBR = newCursorPosition.y - y;
                if (newWidthBR > minSize) {
                    width = newWidthBR;
                }
                if (newHeightBR > minSize) {
                    height = newHeightBR;
                }
                break;
    
            default:
                break;
        }
    
        return { x, y, width, height };
    }
    
}
