import { CardView } from './CardView';
import { ICartItem } from '../../types';
import { EventEmitter } from '../base/Events';
import { cloneTemplate } from '../../utils/utils';

export class CardBasketView extends CardView<ICartItem> {
    private events: EventEmitter;
    private deleteButton: HTMLButtonElement;
    private indexElement: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.deleteButton = this.container.querySelector('.basket__item-delete') as HTMLButtonElement;
        this.indexElement = this.container.querySelector('.basket__item-index') as HTMLElement;
        
        if (this.deleteButton) {
            this.deleteButton.addEventListener('click', this.handleDelete.bind(this));
        }
    }

    render(data: Partial<ICartItem>): HTMLElement {
        if (data) {
            this.setTitle(data.title || '');
            this.setPrice(data.price || null);
            
            if (this.indexElement && data.productId) {
                this.indexElement.textContent = data.productId;
            }
        }
        return this.container;
    }

    private handleDelete(): void {
        this.events.emit('card:remove-from-cart', { productId: this.container.dataset.productId });
    }
}

export function createCardBasketView(events: EventEmitter): CardBasketView {
    const template = cloneTemplate<HTMLElement>('#card-basket');
    return new CardBasketView(template, events);
}
