export class InputService {
    private inputRef: React.RefObject<HTMLInputElement>;

    constructor(inputRef: React.RefObject<HTMLInputElement>) {
        this.inputRef = inputRef;
    }

    static handleImageUpload(
        event: { target: HTMLInputElement },
        callback: (value: string) => void,
    ): void {
        if (!event.target.files || event.target.files.length === 0)
            throw Error("No file selected.");

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (!reader.result) return;
            callback(reader.result as string);
        };
        reader.onerror = () => {
            console.error("Error reading the file.");
        };
        reader.readAsDataURL(file);
    }

    initInput(callback: (value: string) => void): void {
        const inputElement = this.getInput();

        inputElement.accept = "image/*";

        inputElement.onchange = (event) => {
            const target = event.target as HTMLInputElement;
            InputService.handleImageUpload({ target }, callback);
        };

        inputElement.click();
    }

    getInput(): HTMLInputElement {
        if (!this.inputRef.current) throw new Error("Input tag is inactive");
        return this.inputRef.current;
    }
}
