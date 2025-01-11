import { Position } from "~/store/types/Global";
import { Slide } from "~/store/types/slide/Slide";

export type MouseState = {
    isPressed: boolean;
    start: Position;
    end: Position;
    current: Position;
};

export type MoveItemsInput = {
    mouseState: MouseState;
    cursorDelta: CursorDelta;
    slide: Slide;
}

export type CursorDelta = Record<string, Position>