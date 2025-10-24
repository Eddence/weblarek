import { FormView } from './FormView';
import { IBuyer, TPayment } from '../../types';
import { EventEmitter } from '../base/Events';
import { cloneTemplate } from '../../utils/utils';

export class OrderFormView extends FormView<IBuyer> {
    private events: EventEmitter;
    private paymentButtons: HTMLButtonElement[];
    private addressInput: HTMLInputElement;
    private orderButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.paymentButtons = Array.from(this.container.querySelectorAll('button[name]')) as HTMLButtonElement[];
        this.addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
        this.orderButton = this.container.querySelector('.order__button') as HTMLButtonElement;
        
        this.paymentButtons.forEach(button => {
            button.addEventListener('click', this.handlePaymentSelect.bind(this));
        });
        
        if (this.addressInput) {
            this.addressInput.addEventListener('input', this.handleAddressChange.bind(this));
        }
        
        if (this.formElement) {
            this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    render(data: Partial<IBuyer>): HTMLElement {
        if (data) {
            if (data.payment) {
                this.setPaymentMethod(data.payment);
            }
            
            if (this.addressInput && data.address) {
                this.setInputValue(this.addressInput, data.address);
            }
        }
        return this.container;
    }

    private handlePaymentSelect(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const payment = button.name as TPayment;
        
        this.setPaymentMethod(payment);
        this.events.emit('order:payment-change', { payment });
    }

    private handleAddressChange(): void {
        const address = this.getInputValue(this.addressInput);
        this.events.emit('order:address-change', { address });
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        this.events.emit('form:submit', { form: 'order' });
    }

    private setPaymentMethod(payment: TPayment): void {
        this.paymentButtons.forEach(button => {
            button.classList.remove('button_alt-active');
        });
        
        const selectedButton = this.paymentButtons.find(button => button.name === payment);
        if (selectedButton) {
            selectedButton.classList.add('button_alt-active');
        }
    }

    setValidationErrors(errors: Record<string, string>): void {
        this.setErrors(errors);
    }

    setOrderButtonEnabled(enabled: boolean): void {
        this.setSubmitButtonEnabled(enabled);
    }
}

export function createOrderFormView(events: EventEmitter): OrderFormView {
    const template = cloneTemplate<HTMLElement>('#order');
    return new OrderFormView(template, events);
}
