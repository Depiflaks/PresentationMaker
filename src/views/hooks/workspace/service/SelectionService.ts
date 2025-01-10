import { Editor } from "~/store/types/Editor"
import { Position, Size } from "~/store/types/Global";

type SelectionServiceInput = {
    editorRef: React.RefObject<Editor>;

}

type IsIntersectInput = {
    position: Position;
    object: {
        start: Position;
        size: Size;
    }
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

    isIntersectObject(): boolean {

    }

    isIntersect({ object, position }: IsIntersectInput): boolean {

    }


    private getEditor() {
        if (!this.editorRef.current) throw new Error("Editor is not initialized.");
        return this.editorRef.current;
    }
}
