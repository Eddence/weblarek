import { CardView } from './CardView';
import { IEvents } from '../../../types';

export class CardCatalog extends CardView {
    private _inCart: boolean = false;
    private _id: string = '';

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        container.addEventListener('click', () => {
            this.events.emit('card:select', { id: this._id });
        });
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    set inCart(value: boolean) {
        this._inCart = value;
    }

    get inCart(): boolean {
        return this._inCart;
    }
}