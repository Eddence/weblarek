import { FormView } from './FormView';
import { IBuyer, IEvents } from '../../../types';

export class OrderForm extends FormView<IBuyer> {
    protected _buttonCard: HTMLButtonElement;
    protected _buttonCash: HTMLButtonElement;
    protected _address: HTMLInputElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._buttonCard = container.querySelector('button[name="card"]')!;
        this._buttonCash = container.querySelector('button[name="cash"]')!;
        this._address = container.querySelector('input[name="address"]')!;
        this._errors = container.querySelector('.form__errors')!;

        this._buttonCard.addEventListener('click', () => {
            this.events.emit('order:payment', { payment: 'card' });
        });

        this._buttonCash.addEventListener('click', () => {
            this.events.emit('order:payment', { payment: 'cash' });
        });

        this._address.addEventListener('input', () => {
            this.events.emit('order:address', { address: this._address.value });
        });
    }

    toggleCard(state: boolean = true) {
        this.toggleClass(this._buttonCard, 'button_alt-active', state);
    }

    toggleCash(state: boolean = true) {
        this.toggleClass(this._buttonCash, 'button_alt-active', state);
    }

    set address(value: string) {
        this._address.value = value;
    }

    set addressValid(valid: boolean) {
        this.toggleClass(this._address, 'form__input_invalid', !valid);
    }

    set payment(value: 'card' | 'cash') {
        if (value === 'card') {
            this.toggleCard(true);
            this.toggleCash(false);
        } else {
            this.toggleCard(false);
            this.toggleCash(true);
        }
    }

    setValidation(errors: Record<string, string>) {
        this.errors = Object.values(errors).join('<br>');
        this.valid = Object.keys(errors).length === 0;
        this.addressValid = !errors['address'];
    }

    render(data?: Partial<IBuyer>) {
        if (data) {
            Object.assign(this as object, data);
        }
        return this.container;
    }

    setInitialData(data: Partial<IBuyer>) {
        if (data.payment) {
            this.payment = data.payment;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
    }
}