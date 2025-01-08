import { ToolType } from "~/store/types/Presentation";
import PropertyEditor from "./propertyEditor/PropertyEditor";
import SlideList from "./slideList/SlideList";
import Workspace from "./workspace/Workspace";

import styles from "./Editor.module.css"

type Props = {
    currentTool: ToolType
}

export default function Editor({ currentTool }: Props) {
    return (
        <div className={styles.editor}>
            <Workspace tool={currentTool} />
            <SlideList />
            <PropertyEditor />
        </div>
    );
}
