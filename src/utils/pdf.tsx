import jsPDF from "jspdf";
import { FIELD } from "~/store/const/CONST";
import { Editor } from "~/store/types/Editor";
import { ElementType, TextElement, ImageElement } from "~/store/types/slide/element/Element";
import { loadArialFont } from "~/views/assets/fonts/arial";

export function generatePDF(editor: Editor): void {
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [FIELD.width, FIELD.height],
    });
    loadArialFont(pdf);
    pdf.setFont("arial", "normal");

    const slides = Object.values(editor.slides);

    slides.forEach((slide, index) => {
        const { view } = slide;

        pdf.setFillColor(view.background || "#FFFFFF");
        pdf.rect(0, 0, FIELD.width, FIELD.height, "F");
        Object.values(view.elements).forEach((element) => {
            if (element.type === ElementType.TEXT) {
                const textElement = element as TextElement;
                pdf.setFontSize(textElement.fontSize);
                pdf.setTextColor(textElement.color);
                pdf.text(
                    textElement.content,
                    textElement.x,
                    textElement.y,
                );
            } else if (element.type === ElementType.IMAGE) {
                const imageElement = element as ImageElement;
                pdf.addImage(
                    imageElement.href,
                    "JPEG",
                    imageElement.x,
                    imageElement.y,
                    imageElement.width,
                    imageElement.height
                );
            }
        });

        if (index < slides.length - 1) {
            pdf.addPage([FIELD.width, FIELD.height], "landscape");
        }
    });

    pdf.save(`${editor.title || "presentation"}.pdf`);
}
