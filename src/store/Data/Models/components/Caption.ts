import { createId } from "../../../Methods/Generator/Generator";
import { TextElement } from "../../../Types/types";


export const caption: TextElement = {
    type: 'text',
    id: createId(),
    content: 'Your Title',
    fontSize: 120,
    fontFamily: 'arial',
    color: '#333',
    position: {
        x: 100, 
        y: 300
    },
    size: {
        width: 300,
        height: 100
    }
}