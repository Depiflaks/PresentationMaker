export type UpdateTextElementInput = {
    elementId: string;
    parameters: {
        type?: "text";
        content?: string;
        fontSize?: number;
        fontFamily?: string;
        color?: string;
    };
};
