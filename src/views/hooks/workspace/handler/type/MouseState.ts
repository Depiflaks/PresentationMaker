import { Position } from "~/store/types/Presentation";

export type MouseState = {
    isPressed: boolean;
    start: Position;
    end: Position;
    current: Position;
};