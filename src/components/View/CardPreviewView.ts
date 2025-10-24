import { CardView } from './CardView';
import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';
import { cloneTemplate } from '../../utils/utils';

export class CardPreviewView extends CardView<IProduct> {
    private events: EventEmitter;
    private addButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.addButton = this.container.querySelector('.card__button') as HTMLButtonElement;
        
        if (this.addButton) {
            this.addButton.addEventListener('click', this.handleAddToCart.bind(this));
        }
    }

    render(data: Partial<IProduct>): HTMLElement {
        if (data) {
            this.setCategory(data.category || '');
            this.setTitle(data.title || '');
            this.setPrice(data.price || null);
            this.setImage(data.image || '', data.title);
            
            const textElement = this.container.querySelector('.card__text') as HTMLElement;
            if (textElement && data.description) {
                textElement.textContent = data.description;
            }
        }
        return this.container;
    }

    private handleAddToCart(): void {
        this.events.emit('card:add-to-cart', { product: this.container });
    }
}

export function createCardPreviewView(events: EventEmitter): CardPreviewView {
    const template = cloneTemplate<HTMLElement>('#card-preview');
    return new CardPreviewView(template, events);
}
