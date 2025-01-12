import { Position } from "~/store/types/Global";

export type MouseState = {
    isPressed: boolean;
    start: Position;
    end: Position;
    current: Position;
};

export type MoveItemsInput = {
    mouseState: MouseState;
    cursorDelta: CursorDelta;
}

export type CursorDelta = Record<string, Position>