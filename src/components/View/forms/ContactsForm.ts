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
        });

        this._phone.addEventListener('input', () => {
            this.events.emit('contacts:change', {
                field: 'phone',
                value: this._phone.value
            });
        });
    }

    set email(value: string) {
        this._email.value = value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }

    set emailValid(valid: boolean) {
        this.toggleClass(this._email, 'form__input_invalid', !valid);
    }

    set phoneValid(valid: boolean) {
        this.toggleClass(this._phone, 'form__input_invalid', !valid);
    }

    setValidation(errors: Record<string, string>) {
        this.errors = Object.values(errors).join('<br>');
        this.emailValid = !errors['email'];
        this.phoneValid = !errors['phone'];
        this.valid = Object.keys(errors).length === 0;
    }
}