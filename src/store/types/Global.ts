export type Position = {
    x: number,
    y: number,
}

export type Size = {
    width: number,
    height: number,
}

export enum ToolType {
    HAND = "hand",
    SELECTION = "selection",
    ZOOM = 'zoom',
    TEXT = 'text',
    IMAGE = 'image',
    UNDO = 'undo',
    REDO = 'redo',
    SETTINGS = 'settings',
    NONE = 'none'
};