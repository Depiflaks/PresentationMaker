import jsPDF from "jspdf";
import { Slide } from "~/store/types/slide/Slide";
import { renderToStaticMarkup } from "react-dom/server";
import { Editor } from "~/store/types/Editor";

export function downloadSlidesAsPDF(editor: Editor) {
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
    });

    const slides = Object.values(editor.slides);
    slides.forEach((slide, index) => {
        const svgContent = renderSlideToSVG(slide);
        const svgDataURL = createSVGDataURL(svgContent);

        pdf.addImage(svgDataURL, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

        if (index < slides.length - 1) {
            pdf.addPage();
        }
    });

    pdf.save(`${editor.title || "presentation"}.pdf`);
}

function renderSlideToSVG(slide: Slide): string {
    const svgMarkup = renderToStaticMarkup();
    return svgMarkup;
}

function createSVGDataURL(svgContent: string): string {
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    return URL.createObjectURL(svgBlob);
}
