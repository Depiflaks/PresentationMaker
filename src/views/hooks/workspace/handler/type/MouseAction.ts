export enum MouseAction {
    SELECT = "select",
    MOVE = "move",
    RESIZE = "resize"
};

export enum ResizeType {
    TOP_LEFT = "nw-resize",
    TOP_CENTER = "n-resize",
    TOP_RIGHT = "ne-resize",
    MIDDLE_LEFT = "w-resize",
    MIDDLE_RIGHT = "e-resize",
    BOTTOM_LEFT = "sw-resize",
    BOTTOM_CENTER = "s-resize",
    BOTTOM_RIGHT = "se-resize",
    NONE = "null"
}
