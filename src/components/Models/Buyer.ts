import { IBuyer, TPayment, IEvents } from '../../types';

export class Buyer {
    private _payment: TPayment | null = null;
    private _address: string = '';
    private _phone: string = '';
    private _email: string = '';

    constructor(private events: IEvents) {}

    // Геттеры
    get payment(): TPayment | null {
        return this._payment;
    }

    get address(): string {
        return this._address;
    }

    get phone(): string {
        return this._phone;
    }

    get email(): string {
        return this._email;
    }

    setAllData(data: IBuyer): void {
        this._payment = data.payment;
        this._address = data.address;
        this._phone = data.phone;
        this._email = data.email;
        this.events.emit('buyer:changed');
    }

    set payment(value: TPayment) {
        this._payment = value;
    }

    set address(value: string) {
        this._address = value;
    }

    set phone(value: string) {
        this._phone = value;
    }

    set email(value: string) {
        this._email = value;
    }

    getData(): IBuyer {
        if (this._payment === null) {
            throw new Error('Не выбран способ оплаты');
        }
        return {
            payment: this._payment,
            address: this._address,
            phone: this._phone,
            email: this._email,
        };
    }

    clear(): void {
        this._payment = null;
        this._address = '';
        this._phone = '';
        this._email = '';
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    private isValidPhone(phone: string): boolean {
        return /^\+?[\d\s\-\(\)]{10,}$/.test(phone.trim());
    }

    validate() {
        const errors: Record<string, string> = {};

        if (!this._payment) {
            errors['payment'] = 'Способ оплаты не выбран';
        }

        if (!this._address.trim()) {
            errors['address'] = 'Адрес не указан';
        }

        if (!this._phone.trim()) {
            errors['phone'] = 'Телефон не указан';
        } else if (!this.isValidPhone(this._phone)) {
            errors['phone'] = 'Некорректный формат телефона';
        }

        if (!this._email.trim()) {
            errors['email'] = 'Email не указан';
        } else if (!this.isValidEmail(this._email)) {
            errors['email'] = 'Некорректный формат email';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    validateOrderForm() {
        const errors: Record<string, string> = {};

        if (!this._payment) {
            errors['payment'] = 'Способ оплаты не выбран';
        }

        if (!this._address.trim()) {
            errors['address'] = 'Адрес не указан';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    validateContactsForm() {
        const errors: Record<string, string> = {};

        if (!this._phone.trim()) {
            errors['phone'] = 'Телефон не указан';
        } else if (!this.isValidPhone(this._phone)) {
            errors['phone'] = 'Некорректный формат телефона';
        }

        if (!this._email.trim()) {
            errors['email'] = 'Email не указан';
        } else if (!this.isValidEmail(this._email)) {
            errors['email'] = 'Некорректный формат email';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}