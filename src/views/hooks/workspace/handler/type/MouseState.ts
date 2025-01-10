import { Position } from "~/store/types/Global";

export type MouseState = {
    isPressed: boolean;
    start: Position;
    end: Position;
    current: Position;
};