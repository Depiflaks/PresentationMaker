import styles from "./Properties.module.css"

import { useAppSelector } from "~/views/hooks/useAppSelector";
import CheckBox from "./components/CheckBox";
import DoubleInput from "./components/DoubleInput";
import SingleInput from "./components/SingleInput";
import TextArea from "./components/TextArea";
import Color from "./components/Color";

export default function Properties() {
    const editor = useAppSelector((editor) => editor);

    return (
        <div className={styles.properties}>
            <CheckBox
                caption="Enable Feature"
                subCaption="Activate this option"
                value={false}
                onChange={() => {}}
            />
            <DoubleInput
                caption="Position"
                items={{ first: "X", second: "Y" }}
                value={{ first: 0, second: 0 }}
                onChange={() => {}}
            />
            <DoubleInput
                caption="Size"
                items={{ first: "Width", second: "Height" }}
                value={{ first: 0, second: 0 }}
                onChange={() => {}}
            />
            <SingleInput
                caption="Z-Index"
                type="number"
                value={0}
                onBlur={() => {}}
            />
            <SingleInput
                caption="Font Size"
                type="number"
                value={16}
                onBlur={() => {}}
            />
            <SingleInput
                caption="Font Family"
                type="text"
                value="Arial"
                onBlur={() => {}}
            />
            <TextArea content="Your content here" onChange={() => {}} value="123" />
            <Color caption="Choose Color" color="#000000" onChange={() => {}} />
        </div>
    );
}
