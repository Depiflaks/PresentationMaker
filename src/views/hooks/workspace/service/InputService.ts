export class InputService {
    private inputRef: React.RefObject<HTMLInputElement>;

    constructor(inputRef: React.RefObject<HTMLInputElement>) {
        this.inputRef = inputRef;
    }

    setupImageInput(callback: () => {}): void {
        const inputElement = this.getInput();

        inputElement.accept = "image/*";

        inputElement.onchange = callback();

        inputElement.click();
    }

    getInput() {
        if (!this.inputRef.current) throw new Error("Input tag is inactive");
        return this.inputRef.current;
    }
}
