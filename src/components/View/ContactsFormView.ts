import { FormView } from './FormView';
import { IBuyer } from '../../types';
import { EventEmitter } from '../base/Events';
import { cloneTemplate } from '../../utils/utils';

export class ContactsFormView extends FormView<IBuyer> {
    private events: EventEmitter;
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    protected submitButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.emailInput = this.container.querySelector('input[name="email"]') as HTMLInputElement;
        this.phoneInput = this.container.querySelector('input[name="phone"]') as HTMLInputElement;
        this.submitButton = this.container.querySelector('button[type="submit"]') as HTMLButtonElement;
        
        if (this.emailInput) {
            this.emailInput.addEventListener('input', this.handleEmailChange.bind(this));
        }
        
        if (this.phoneInput) {
            this.phoneInput.addEventListener('input', this.handlePhoneChange.bind(this));
        }
        
        if (this.formElement) {
            this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    render(data: Partial<IBuyer>): HTMLElement {
        if (data) {
            if (this.emailInput && data.email) {
                this.setInputValue(this.emailInput, data.email);
            }
            
            if (this.phoneInput && data.phone) {
                this.setInputValue(this.phoneInput, data.phone);
            }
        }
        return this.container;
    }

    private handleEmailChange(): void {
        const email = this.getInputValue(this.emailInput);
        this.events.emit('contacts:email-change', { email });
    }

    private handlePhoneChange(): void {
        const phone = this.getInputValue(this.phoneInput);
        this.events.emit('contacts:phone-change', { phone });
    }

    protected handleSubmit(event: Event): void {
        event.preventDefault();
        this.events.emit('form:submit', { form: 'contacts' });
    }

    setValidationErrors(errors: Record<string, string>): void {
        this.setErrors(errors);
    }

    setSubmitButtonEnabled(enabled: boolean): void {
        if (this.submitButton) {
            this.submitButton.disabled = !enabled;
        }
    }
}

export function createContactsFormView(events: EventEmitter): ContactsFormView {
    const template = cloneTemplate<HTMLElement>('#contacts');
    return new ContactsFormView(template, events);
}
