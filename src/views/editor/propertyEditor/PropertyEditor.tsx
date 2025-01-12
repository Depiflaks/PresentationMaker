import { useRef, useState } from "react";
import styles from "./PropertyEditor.module.css";
import Resizer from "./resizer/Resizer";
import { useAppSelector } from "~/views/hooks/useAppSelector";
import Properties from "./properties/Properties";

export const INTERVAL: {MIN: number, MAX: number} = {
    MIN: 150,
    MAX: 500
}

export default function PropertyEditor() {
    const editor = useAppSelector((editor) => editor);

    const [separatorHeight, setSeparatorHeight] = useState<number>((INTERVAL.MIN + INTERVAL.MAX) / 2);
    const propertiesRef = useRef<HTMLDivElement>(null);
    const propertyEditorRef = useRef<HTMLDivElement>(null);
    
    const onSeparatorChange = (newSize: number) => {
        setSeparatorHeight(Math.min(Math.max(INTERVAL.MIN, newSize), INTERVAL.MAX))
    };

    const conponentsHeight = propertyEditorRef.current ? propertyEditorRef.current!.getBoundingClientRect().height - separatorHeight - 120 : INTERVAL.MAX;
    
    return (
        <div className={styles['property-editor']} ref={propertyEditorRef}>
            <h3>Properties</h3>
            <div className={styles.properties} style={{height: `${separatorHeight}px`}} ref={propertiesRef}>
                <Properties />
            </div>

            <Resizer onSeparatorChange={onSeparatorChange} propertiesRef={propertiesRef}/>

            <h3>Components</h3>
            <div className={styles.components} style={{height: `${conponentsHeight}px`}}>
                {true ? <p>The list of components is empty</p> : <></>}
            </div>
        </div>
    );
};