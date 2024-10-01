import { Slide } from "../../state/Types/types";
import "./PropertyEditor.css";

type Props = {
    slide: Slide
}

export default function PropertyEditor({slide}: Props) {
    return (
        <div className="property-editor">
            <h3>Properties</h3>
            
            <div className="properties-settings">
                {true ? <p>No element selected</p> : <></>}
            </div>
            <h3>Components</h3>
            <div className="components-settings">
                {true ? <p>The list of components is empty</p> : <></>}
            </div>
        </div>
    );
};