import Ajv from 'ajv';

const editorSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        title: { type: "string" },
        author: { type: "string" },
        order: {
            type: "array",
            items: { type: "string" }
        },
        slides: {
            type: "object",
            patternProperties: {
                ".*": {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        view: {
                            type: "object",
                            properties: {
                                background: { type: "string" },
                                elements: {
                                    type: "object",
                                    patternProperties: {
                                        ".*": {
                                            type: "object",
                                            properties: {
                                                type: {
                                                    type: "string",
                                                    enum: ["text", "image"]
                                                },
                                                id: { type: "string" },
                                                zIndex: { type: "number" },
                                                x: { type: "number" },
                                                y: { type: "number" },
                                                width: { type: "number" },
                                                height: { type: "number" },
                                                content: { type: "string" },
                                                fontSize: { type: "number" },
                                                fontFamily: { type: "string" },
                                                color: { type: "string" },
                                                href: { type: "string" },
                                                aspectRatio: { type: "boolean" }
                                            },
                                            required: ["type", "id", "zIndex", "x", "y", "width", "height"]
                                        }
                                    }
                                },
                                relative: {
                                    type: "object",
                                    properties: {
                                        x: { type: "number" },
                                        y: { type: "number" }
                                    },
                                    required: ["x", "y"]
                                },
                                scale: { type: "number" }
                            },
                            required: ["background", "elements", "relative", "scale"]
                        },
                        selection: {
                            type: "object",
                            properties: {
                                area: {
                                    type: "object",
                                    properties: {
                                        x: { type: "number" },
                                        y: { type: "number" },
                                        width: { type: "number" },
                                        height: { type: "number" }
                                    },
                                    required: ["x", "y", "width", "height"]
                                },
                                areaType: {
                                    type: "string",
                                    enum: ["#fce181", "#fff"]
                                },
                                elements: {
                                    type: "array",
                                    items: { type: "string" }
                                }
                            },
                            required: ["area", "areaType", "elements"]
                        }
                    },
                    required: ["id", "view", "selection"]
                }
            }
        },
        current: { type: "string" }
    },
    required: ["id", "title", "author", "order", "slides", "current"]
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
