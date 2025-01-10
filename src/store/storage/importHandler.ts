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
                                                type: { type: "string", enum: ["text", "image"] },
                                                id: { type: "string" },
                                                position: {
                                                    type: "object",
                                                    properties: {
                                                        x: { type: "number" },
                                                        y: { type: "number" }
                                                    },
                                                    required: ["x", "y"]
                                                },
                                                size: {
                                                    type: "object",
                                                    properties: {
                                                        width: { type: "number" },
                                                        height: { type: "number" }
                                                    },
                                                    required: ["width", "height"]
                                                },
                                                content: { type: "string", nullable: true },
                                                fontSize: { type: "number", nullable: true },
                                                fontFamily: { type: "string", nullable: true },
                                                color: { type: "string", nullable: true },
                                                src: { type: "string", nullable: true }
                                            },
                                            required: ["type", "id", "position", "size"]
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
                                main: {
                                    type: "object",
                                    properties: {
                                        start: {
                                            type: "object",
                                            properties: {
                                                x: { type: "number" },
                                                y: { type: "number" }
                                            },
                                            required: ["x", "y"]
                                        },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: "number" },
                                                height: { type: "number" }
                                            },
                                            required: ["width", "height"]
                                        }
                                    },
                                    required: ["start", "size"]
                                },
                                elements: {
                                    type: "array",
                                    items: { type: "string" }
                                }
                            },
                            required: ["main", "elements"]
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
