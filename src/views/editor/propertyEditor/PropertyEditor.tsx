import { useRef, useState } from "react";
import styles from "./PropertyEditor.module.css";
import Resizer from "./resizer/Resizer";

export const Interval: {min: number, max: number} = {
    min: 150,
    max: 500
}

export default function PropertyEditor() {

    const [separator, setSeparator] = useState<number>(Interval.min);
    const propertiesRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    
    const onSeparatorChange = (newSize: number) => {
        setSeparator(Math.min(Math.max(Interval.min, newSize), Interval.max))
    };

    const conponentsHeight = editorRef.current ? editorRef.current!.getBoundingClientRect().height - separator - 120 : Interval.max;
    
    return (
        <div className={styles['property-editor']} ref={editorRef}>
            <h3>Properties</h3>
            <div className={styles.properties} style={{height: `${separator}px`}} ref={propertiesRef}>
                
                {true ? <p>No element selected</p> : <></>}
            </div>

            <Resizer onSeparatorChange={onSeparatorChange} propertiesRef={propertiesRef}/>
            <h3>Components</h3>
            <div className={styles.components} style={{height: `${conponentsHeight}px`}}>
                
                {true ? <p>The list of components is empty</p> : <></>}
            </div>
        </div>
    );
};