import { useRef, useState } from "react";
import { Slide } from "../../state/Types/types";
import "./PropertyEditor.css";
import Resizer from "./Resizer/Resizer";

type Props = {
    slide: Slide
}

export const Interval: {min: number, max: number} = {
    min: 150,
    max: 500
}

export default function PropertyEditor({slide}: Props) {

    const [separator, setSeparator] = useState<number>(Interval.min);
    const propertiesRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    
    const onSeparatorChange = (newSize: number) => {
        setSeparator(Math.min(Math.max(Interval.min, newSize), Interval.max))
    };

    const conponentsHeight = editorRef.current ? editorRef.current!.getBoundingClientRect().height - separator - 120 : Interval.max;
    
    return (
        <div className="property-editor" ref={editorRef}>
            <h3>Properties</h3>
            <div className="properties-settings" style={{height: `${separator}px`}} ref={propertiesRef}>
                
                {true ? <p>No element selected</p> : <></>}
            </div>

            <Resizer onSeparatorChange={onSeparatorChange} propertiesRef={propertiesRef}/>
            <h3>Components</h3>
            <div className="components-settings" style={{height: `${conponentsHeight}px`}}>
                
                {true ? <p>The list of components is empty</p> : <></>}
            </div>
        </div>
    );
};