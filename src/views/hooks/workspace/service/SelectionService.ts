import { Editor } from "~/store/types/Editor"
import { Position, Rect } from "~/store/types/Global";

type SelectionServiceInput = {
    editorRef: React.RefObject<Editor>;

}

type IsIntersectInput = {
    point: Position;
    object: Rect
}

export class SelectionService {
    private editorRef: React.RefObject<Editor>;

    constructor({ editorRef }: SelectionServiceInput) {
        this.editorRef = editorRef;
    }

    intersect(position: Position): string|null {
        const editor = this.getEditor();

        array.forEach(element => {
            
        });
    }

    static isIntersect({ point, object }: IsIntersectInput): boolean {
        const left = object.x;
        const right = object.x + object.width;
        const top = object.y;
        const bottom = object.y + object.height;

        return (
            point.x >= left &&
            point.x <= right &&
            point.y >= top &&
            point.y <= bottom
        );
    }

    

    private getEditor() {
        if (!this.editorRef.current) throw new Error("Editor is not initialized.");
        return this.editorRef.current;
    }
}