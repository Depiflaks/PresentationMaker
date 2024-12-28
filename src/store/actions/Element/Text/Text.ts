import { TextElement } from "../../../types/Presentation";

type ParametersInput = {
    type?: "text";
    content?: string;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
}

export function updateTextElement(
    element: TextElement,
    parameters: ParametersInput,
): TextElement {
    return {
        ...element,
        ...parameters
    };
}