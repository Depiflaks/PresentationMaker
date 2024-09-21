import {
    updatePresentationTitle,
    addSlide,
    removeSlide,
    moveSlide,
    addSelection,
    removeSelection,
    updateElementPosition,
    updateElementSize,
    updateTextContent,
    updateTextFontSize,
    updateTextFontFamily,
    updateSlideBackground,
} from "./Methods/methods";
import { Presentation, Slide, TextElement, ImageElement } from "./Types/types";

// *** Минимальные данные ***
const minimalTextElement: TextElement = {
    id: "text1",
    type: "text",
    content: "",
    fontSize: 12,
    fontFamily: "Arial",
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
};

const minimalSlide: Slide = {
    id: "slide1",
    background: "",
    elements: [],
};

const minimalPresentation: Presentation = {
    id: "presentation1",
    title: "",
    author: "",
    slides: [],
    localSlideId: "",
};

// *** Максимальные данные ***
const maxTextElement: TextElement = {
    id: "text1",
    type: "text",
    content: "Hello world!",
    fontSize: 16,
    fontFamily: "Verdana",
    position: { x: 10, y: 20 },
    size: { width: 100, height: 50 },
};

const maxImageElement: ImageElement = {
    id: "image1",
    type: "image",
    src: "https://example.com/image.jpg",
    position: { x: 30, y: 40 },
    size: { width: 200, height: 100 },
};

const maxSlide: Slide = {
    id: "slide1",
    background: "#FFFFFF",
    elements: [maxTextElement, maxImageElement],
};

const maxPresentation: Presentation = {
    id: "presentation1",
    author: "VasyaPupkin",
    title: "Max Presentation",
    slides: [maxSlide, { ...maxSlide, id: "slide2" }],
    localSlideId: "2312324123123",
};

// *** Тесты функций ***

// 1. updatePresentationTitle
console.assert(
    updatePresentationTitle(minimalPresentation, "New Title").title ===
        "New Title",
    "Failed: updatePresentationTitle with minimal data",
);
console.assert(
    updatePresentationTitle(maxPresentation, "Updated Title").title ===
        "Updated Title",
    "Failed: updatePresentationTitle with maximal data",
);

// 2. addSlide
console.assert(
    addSlide(minimalPresentation, minimalSlide).slides.length === 1,
    "Failed: addSlide with minimal data",
);
console.assert(
    addSlide(maxPresentation, maxSlide).slides.length === 3,
    "Failed: addSlide with maximal data",
);

// 3. removeSlide
console.assert(
    removeSlide(maxPresentation, "slide1").slides.length === 1,
    "Failed: removeSlide with maximal data",
);

// 4. moveSlide
const movedPresentation = moveSlide(maxPresentation, "slide1", 1);
console.assert(
    movedPresentation.slides[1].id === "slide1",
    "Failed: moveSlide with maximal data",
);

// 5. addSelection
const slideWithNewElement = addSelection(minimalSlide, minimalTextElement);
console.assert(
    slideWithNewElement.elements.length === 1,
    "Failed: addSelection with minimal data",
);
console.assert(
    addSelection(maxSlide, maxImageElement).elements.length === 3,
    "Failed: addSelection with maximal data",
);

// 6. removeSelection
console.assert(
    removeSelection(maxSlide, "text1").elements.length === 1,
    "Failed: removeSelection with maximal data",
);

// 7. updateElementPosition
const updatedPositionSlide = updateElementPosition(maxSlide, "text1", {
    x: 100,
    y: 100,
});
console.assert(
    updatedPositionSlide.elements[0].position.x === 100,
    "Failed: updateElementPosition with maximal data",
);

// 8. updateElementSize
const updatedSizeSlide = updateElementSize(maxSlide, "text1", {
    width: 300,
    height: 300,
});
console.assert(
    updatedSizeSlide.elements[0].size.width === 300,
    "Failed: updateElementSize with maximal data",
);

// 9. updateTextContent
const updatedTextSlide = updateTextContent(maxSlide, "text1", "New Content");
console.assert(
    updatedTextSlide.elements[0].type === "text" &&
        updatedTextSlide.elements[0].content === "New Content",
    "Failed: updateTextContent with maximal data",
);

// 10. updateTextFontSize
const updatedFontSizeSlide = updateTextFontSize(maxSlide, "text1", 20);
console.assert(
    updatedFontSizeSlide.elements[0].type === "text" &&
        updatedFontSizeSlide.elements[0].fontSize === 20,
    "Failed: updateTextFontSize with maximal data",
);

// 11. updateTextFontFamily
const updatedFontFamilySlide = updateTextFontFamily(
    maxSlide,
    "text1",
    "Times New Roman",
);
console.assert(
    updatedFontFamilySlide.elements[0].type === "text" &&
        updatedFontFamilySlide.elements[0].fontFamily === "Times New Roman",
    "Failed: updateTextFontFamily with maximal data",
);

// 12. updateSlideBackground
const updatedBackgroundSlide = updateSlideBackground(maxSlide, "#FF0000");
console.assert(
    updatedBackgroundSlide.background === "#FF0000",
    "Failed: updateSlideBackground with maximal data",
);

console.log("All tests passed!");
