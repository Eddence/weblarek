import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export abstract class FormView<T> extends Component<T> {
    protected formElement: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        
        this.formElement = this.container.querySelector('form') as HTMLFormElement;
        this.submitButton = this.container.querySelector('button[type="submit"]') as HTMLButtonElement;
        this.errorsElement = this.container.querySelector('.form__errors') as HTMLElement;
    }

    protected setInputValue(input: HTMLInputElement, value: string): void {
        if (input) {
            input.value = value;
        }
    }

    protected getInputValue(input: HTMLInputElement): string {
        return input ? input.value : '';
    }

    protected setErrors(errors: Record<string, string>): void {
        if (this.errorsElement) {
            const errorMessages = Object.values(errors);
            this.errorsElement.textContent = errorMessages.join(', ');
        }
    }

    protected clearErrors(): void {
        if (this.errorsElement) {
            this.errorsElement.textContent = '';
        }
    }

    protected setSubmitButtonEnabled(enabled: boolean): void {
        if (this.submitButton) {
            this.submitButton.disabled = !enabled;
        }
    }

    protected handleSubmit(event: Event): void {
        event.preventDefault();
        // Переопределяется в дочерних классах
    }
}
