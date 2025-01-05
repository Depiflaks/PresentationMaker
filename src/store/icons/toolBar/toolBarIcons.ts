import hand from "~/views/assets/toolBar/hand.svg";
import image from "~/views/assets/toolBar/image.svg";
import cursor from "~/views/assets/toolBar/cursor.svg";
import text from "~/views/assets/toolBar/text.svg";
import zoom from "~/views/assets/toolBar/zoom.svg";
import settings from "~/views/assets/toolBar/settings/settings.svg";
import { ToolType } from "~/store/types/Presentation";

const toolBarIconsMap: Record<ToolType, string> = {
    [ToolType.HAND]: hand,
    [ToolType.SELECTION]: cursor,
    [ToolType.ZOOM]: zoom,
    [ToolType.TEXT]: text,
    [ToolType.IMAGE]: image,
    [ToolType.SETTINGS]: settings,
    [ToolType.IMPORT]: "",
    [ToolType.EXPORT]: "",
};

function convertToPairArray(): { value: ToolType; imgSrc: string }[] {
    return Object.entries(toolBarIconsMap).map(([value, imgSrc]) => ({
        value: value as ToolType,
        imgSrc,
    }));
}

export const toolBarIconsArray = convertToPairArray();