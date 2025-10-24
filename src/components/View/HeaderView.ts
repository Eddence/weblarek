import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class HeaderView extends Component<{ count: number }> {
    private events: EventEmitter;
    private basketButton: HTMLButtonElement;
    private basketCounter: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;
        
        this.basketButton = this.container.querySelector('.header__basket') as HTMLButtonElement;
        this.basketCounter = this.container.querySelector('.header__basket-counter') as HTMLElement;
        
        if (this.basketButton) {
            this.basketButton.addEventListener('click', this.handleBasketClick.bind(this));
        }
    }

    render(data: Partial<{ count: number }>): HTMLElement {
        if (data && data.count !== undefined) {
            this.setBasketCount(data.count);
        }
        return this.container;
    }

    private handleBasketClick(): void {
        this.events.emit('header:basket-open');
    }

    private setBasketCount(count: number): void {
        if (this.basketCounter) {
            this.basketCounter.textContent = count.toString();
        }
    }
}
