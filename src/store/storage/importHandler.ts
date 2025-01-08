import Ajv from 'ajv';
import { Editor } from '../types/Editor';

const editorSchema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            properties: {
                id: { type: "string" },
                title: { type: "string" },
                author: { type: "string" },
                order: { type: "array", items: { type: "string" } },
                slides: {
                    type: "object",
                    additionalProperties: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            background: { type: "string" },
                            elements: {
                                type: "object",
                                additionalProperties: {
                                    type: "object",
                                    properties: {
                                        type: { type: "string" },
                                        id: { type: "string" },
                                        position: {
                                            type: "object",
                                            properties: {
                                                x: { type: "number" },
                                                y: { type: "number" },
                                            },
                                            required: ["x", "y"],
                                        },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: "number" },
                                                height: { type: "number" },
                                            },
                                            required: ["width", "height"],
                                        },
                                    },
                                    required: ["type", "id", "position", "size"],
                                },
                            },
                            scale: { type: "number" },
                            relative: {
                                type: "object",
                                properties: {
                                    x: { type: "number" },
                                    y: { type: "number" },
                                },
                                required: ["x", "y"],
                            },
                        },
                        required: ["id", "background", "elements", "scale", "relative"],
                    },
                },
                current: { type: "string" },
            },
            required: ["id", "title", "author", "order", "slides", "current"],
        },
        selection: {
            type: "object",
            properties: {
                main: {
                    type: "object",
                    properties: {
                        position: {
                            type: "object",
                            properties: {
                                x: { type: "number" },
                                y: { type: "number" },
                            },
                            required: ["x", "y"],
                        },
                        size: {
                            type: "object",
                            properties: {
                                width: { type: "number" },
                                height: { type: "number" },
                            },
                            required: ["width", "height"],
                        },
                    },
                    required: ["position", "size"],
                },
                elements: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            position: {
                                type: "object",
                                properties: {
                                    x: { type: "number" },
                                    y: { type: "number" },
                                },
                                required: ["x", "y"],
                            },
                            size: {
                                type: "object",
                                properties: {
                                    width: { type: "number" },
                                    height: { type: "number" },
                                },
                                required: ["width", "height"],
                            },
                            id: { type: "string" },
                        },
                        required: ["position", "size", "id"],
                    },
                },
            },
            required: ["main", "elements"],
        },
    },
    required: ["presentation", "selection"],
};

export function validateEditor(editor: Object) {
    const ajv = new Ajv();
    const validate = ajv.compile(editorSchema);

    const valid = validate(editor);
    if (!valid) {
        return validate.errors;
    }
    return null;
};
