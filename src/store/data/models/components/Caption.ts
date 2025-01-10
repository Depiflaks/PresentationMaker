import { ElementType, TextElement } from "~/store/types/slide/element/Element";
import { createId } from "~/utils/uuid";


export const caption: TextElement = {
    type: ElementType.TEXT,
    id: createId(),
    content: 'Your Title',
    fontSize: 120,
    fontFamily: 'arial',
    color: '#333',
    x: 0, 
    y: 0,
    width: 300,
    height: 100,
    zIndex: 1,
}