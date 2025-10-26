import { FormView } from './FormView';
import { IBuyer, IEvents } from '../../../types';

export class ContactsForm extends FormView<IBuyer> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._email = container.querySelector('.form__input[name="email"]')!;
        this._phone = container.querySelector('.form__input[name="phone"]')!;

        // Изначально кнопка неактивна
        this.valid = false;

        this._email.addEventListener('input', () => {
            this.events.emit('contacts:change', {
                field: 'email',
                value: this._email.value
            });
            this.validateForm();
        });

        this._phone.addEventListener('input', () => {
            this.events.emit('contacts:change', {
                field: 'phone',
                value: this._phone.value
            });
            this.validateForm();
        });
    }

    private validateForm(): void {
        const emailValid = this._email.value.trim().length > 0;
        const phoneValid = this._phone.value.trim().length > 0;
        this.valid = emailValid && phoneValid;
    }

    set email(value: string) {
        this._email.value = value;
        this.validateForm();
    }

    set phone(value: string) {
        this._phone.value = value;
        this.validateForm();
    }

    set emailValid(valid: boolean) {
        this.toggleClass(this._email, 'form__input_invalid', !valid);
    }

    set phoneValid(valid: boolean) {
        this.toggleClass(this._phone, 'form__input_invalid', !valid);
    }

    setValidation(errors: string[], fields: { email: boolean; phone: boolean }) {
        this.errors = errors.join('<br>');
        this.emailValid = fields.email;
        this.phoneValid = fields.phone;
        // Валидация кнопки теперь управляется validateForm()
        this.validateForm();
    }
}