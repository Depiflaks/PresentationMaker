import { MouseState } from "../type/MouseState";

export const emptyState: MouseState = {
    isPressed: false,
    start: {
        x: 0,
        y: 0,
    },
    end: {
        x: 0,
        y: 0,
    },
    current: {
        x: 0,
        y: 0,
    },
};