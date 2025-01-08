import { TextElement } from "~/store/types/Presentation";
import { createId } from "~/utils/uuid";


export const caption: TextElement = {
    type: 'text',
    id: createId(),
    content: 'Your Title',
    fontSize: 120,
    fontFamily: 'arial',
    color: '#333',
    position: {
        x: 0, 
        y: 0
    },
    size: {
        width: 300,
        height: 100
    }
}