import { Editor } from "~/store/types/Editor"
import { Position, Rect } from "~/store/types/Global";
import { Element } from "~/store/types/slide/element/Element";
import { Elements, Slide } from "~/store/types/slide/Slide";

type SelectionServiceInput = {
    editorRef: React.RefObject<Editor>;

}

export class SelectionService {
    private editorRef: React.RefObject<Editor>;

    constructor({ editorRef }: SelectionServiceInput) {
        this.editorRef = editorRef;
    }

    getForegroundObjectId(point: Position): string | null {
        const slide = this.getSlide();

        const elements = slide.view.elements;
        let topElement: Element|null = null;
        for (const elementId in elements) {
            const element = elements[elementId];
            const intersects = SelectionService.isIntersect(
                point,
                element,
            );
            if (intersects) {
                if (!topElement || element.zIndex > topElement.zIndex) {
                    topElement = element;
                }
            }
        }
        return topElement ? topElement.id : null;
    }

    static mapElementsByZIndex(slide: Slide): Record<number, Elements> {
        const result: Record<number, Elements> = {};
    
        Object.values(slide.view.elements).forEach((element) => {
            const { zIndex } = element;
            if (!result[zIndex]) {
                result[zIndex] = {};
            }
            result[zIndex][element.id] = element;
        });
    
        return result;
    }

    static isIntersect(point: Position, rect: Rect): boolean {
        const left = rect.x;
        const right = rect.x + rect.width;
        const top = rect.y;
        const bottom = rect.y + rect.height;

        return (
            point.x >= left &&
            point.x <= right &&
            point.y >= top &&
            point.y <= bottom
        );
    }

    getEditor() {
        if (!this.editorRef.current) throw new Error("Editor is not initialized.");
        return this.editorRef.current;
    }

    getSlide(): Slide {
        const editor = this.getEditor();
        if (editor.current === "") throw new Error("Slide list is empty");
        return editor.slides[editor.current];
    }
}