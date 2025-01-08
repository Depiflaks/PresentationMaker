import { ToolType } from "~/store/types/Presentation";

export const TOOLBAR_TOOLS: ToolType[] = [
    ToolType.HAND,
    ToolType.SELECTION,
    ToolType.ZOOM,
    ToolType.TEXT,
    ToolType.IMAGE,
];

export const POPUP_TOOLS: ToolType[] = [
    ToolType.IMPORT,
    ToolType.EXPORT,
];