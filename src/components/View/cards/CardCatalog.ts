import { CardView } from './CardView';
import { IEvents } from '../../../types';

export class CardCatalog extends CardView {
    private _inCart: boolean = false;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        container.addEventListener('click', () => {
            this.events.emit('card:select', { id: container.dataset.id });
        });
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set inCart(value: boolean) {
        this._inCart = value;
    }

    get inCart(): boolean {
        return this._inCart;
    }
}