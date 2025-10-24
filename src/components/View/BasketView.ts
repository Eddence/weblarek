import { Component } from '../base/Component';
import { ICartItem } from '../../types';
import { EventEmitter } from '../base/Events';
import { createCardBasketView } from './CardBasketView';
import { cloneTemplate } from '../../utils/utils';

export class BasketView extends Component<ICartItem[]> {
    private events: EventEmitter;
    private basketList: HTMLElement;
    private orderButton: HTMLButtonElement;
    private basketPrice: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.basketList = this.container.querySelector('.basket__list') as HTMLElement;
        this.orderButton = this.container.querySelector('.basket__button') as HTMLButtonElement;
        this.basketPrice = this.container.querySelector('.basket__price') as HTMLElement;
        
        if (this.orderButton) {
            this.orderButton.addEventListener('click', this.handleOrderClick.bind(this));
        }
    }

    render(data: Partial<ICartItem[]>): HTMLElement {
        if (data) {
            this.renderBasketItems(data);
            this.updateTotal(data);
        }
        return this.container;
    }

    private renderBasketItems(items: ICartItem[]): void {
        if (this.basketList) {
            this.basketList.innerHTML = '';
            
            items.forEach((item, index) => {
                const cardView = createCardBasketView(this.events);
                
                const itemData = {
                    ...item,
                    productId: (index + 1).toString()
                };
                
                cardView.render(itemData);
                cardView.container.dataset.productId = item.productId;
                
                this.basketList.appendChild(cardView.container);
            });
        }
    }

    private updateTotal(items: ICartItem[]): void {
        if (this.basketPrice) {
            const total = items.reduce((sum, item) => {
                return sum + (item.price || 0) * item.quantity;
            }, 0);
            
            this.basketPrice.textContent = `${total} синапсов`;
        }
    }

    private handleOrderClick(): void {
        this.events.emit('basket:order');
    }
}

export function createBasketView(events: EventEmitter): BasketView {
    const template = cloneTemplate<HTMLElement>('#basket');
    return new BasketView(template, events);
}
