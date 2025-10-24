import { IBuyer, TPayment } from '../../types';
import { EventEmitter } from '../base/Events';

export class Buyer {
    private payment: TPayment | null = null;
    private email: string = '';
    private phone: string = '';
    private address: string = '';
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setData(data: Partial<IBuyer>): void {
        let hasChanges = false;
        
        if (data.payment !== undefined && this.payment !== data.payment) {
            this.payment = data.payment;
            hasChanges = true;
        }
        if (data.email !== undefined && this.email !== data.email) {
            this.email = data.email;
            hasChanges = true;
        }
        if (data.phone !== undefined && this.phone !== data.phone) {
            this.phone = data.phone;
            hasChanges = true;
        }
        if (data.address !== undefined && this.address !== data.address) {
            this.address = data.address;
            hasChanges = true;
        }

        if (hasChanges) {
            this.events.emit('buyer:data-changed', { data: this.getData() });
        }
    }

    getData(): IBuyer {
        return {
            payment: (this.payment ?? 'card'),
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        const clearedData = this.getData();
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events.emit('buyer:cleared', { data: clearedData });
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};
        if (!this.payment) errors.payment = 'Не выбран вид оплаты';
        if (!this.email) errors.email = 'Укажите емэйл';
        if (!this.phone) errors.phone = 'Укажите телефон';
        if (!this.address) errors.address = 'Укажите адрес';
        return errors;
    }
}

export default Buyer;

