export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface Rect extends Position, Size {};

export interface Circle extends Position {
    radius: number
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