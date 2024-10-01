import React from "react";

export function createHooks(): {}
{
    const [selectedTool, setselectedTool] = React.useState("selection");
    const [selectedSlide, setselectedSlide] = React.useState(0);
    const [selectedObjects, setSelectedObjects] = React.useState(null);
    return {
        selectedTool, 
        setselectedTool, 
        selectedSlide, 
        setselectedSlide, 
        selectedObjects, 
        setSelectedObjects
    }
}