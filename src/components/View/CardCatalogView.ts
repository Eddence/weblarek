import { CardView } from './CardView';
import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';
import { cloneTemplate } from '../../utils/utils';

export class CardCatalogView extends CardView<IProduct> {
    private events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.container.addEventListener('click', this.handleClick.bind(this));
    }

    render(data: Partial<IProduct>): HTMLElement {
        if (data) {
            this.setCategory(data.category || '');
            this.setTitle(data.title || '');
            this.setPrice(data.price || null);
            this.setImage(data.image || '', data.title);
        }
        return this.container;
    }

    private handleClick(): void {
        this.events.emit('card:select', { product: this.container });
    }
}

export function createCardCatalogView(events: EventEmitter): CardCatalogView {
    const template = cloneTemplate<HTMLElement>('#card-catalog');
    return new CardCatalogView(template, events);
}
